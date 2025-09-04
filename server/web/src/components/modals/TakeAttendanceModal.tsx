import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/table';
import { X, QrCode, Users, CheckCircle, ArrowRight, ArrowLeft, RefreshCw, AlertTriangle, Search, Maximize, Minimize } from 'lucide-react';
import { MOCK_STUDENTS, Student } from '../../data/mockStudents';

interface TakeAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'scanner' | 'attendance';
}

type Step = 'scanner' | 'selection' | 'mode' | 'qr' | 'manual' | 'confirmation' | 'review';
type AttendanceMode = 'qr' | 'manual' | 'hybrid';

export const TakeAttendanceModal: React.FC<TakeAttendanceModalProps> = ({ isOpen, onClose, initialMode = 'attendance' }) => {
  const [step, setStep] = useState<Step>(initialMode === 'scanner' ? 'scanner' : 'selection');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [attendanceMode, setAttendanceMode] = useState<AttendanceMode>('qr');
  const [qrValue, setQrValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [sessionActive, setSessionActive] = useState(false);
  const [attendanceResults, setAttendanceResults] = useState({ present: 0, total: 0 });
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rollNumberInput, setRollNumberInput] = useState('');

  const courses = [
    { id: 'cs101', name: 'CSE101 – Data Structures', students: 50 },
    { id: 'math201', name: 'MATH201 – Calculus II', students: 42 },
    { id: 'eng101', name: 'ENG101 – English Literature', students: 35 },
    { id: 'phy101', name: 'PHY101 – Physics I', students: 38 },
  ];

  const sections = ['A', 'B', 'C', 'D'];
  const sessionTypes = ['Lecture', 'Lab', 'Seminar', 'Tutorial'];

  const currentDateTime = new Date().toLocaleString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  // Timer effect for QR code
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setSessionActive(false);
            // For hybrid mode, go to review step instead of confirmation
            if (attendanceMode === 'hybrid') {
              setStep('review');
            } else {
              setStep('confirmation');
              setAttendanceResults({ present: Math.floor(Math.random() * 40) + 30, total: selectedCourseData?.students || 50 });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, timeLeft, selectedCourseData, attendanceMode]);

  const generateQRCode = () => {
    const sessionId = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    const qrData = {
      sessionId,
      courseId: selectedCourse,
      section: selectedSection,
      type: sessionType,
      timestamp,
      expires: timestamp + (180 * 1000) // 3 minutes
    };
    setQrValue(JSON.stringify(qrData));
    setSessionActive(true);
    setTimeLeft(180);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateStudentList = () => {
    setStudents(MOCK_STUDENTS.map(student => ({ ...student, present: false })));
  };

  const handleNext = () => {
    if (step === 'selection') {
      generateStudentList();
      setStep('mode');
    } else if (step === 'mode') {
      if (attendanceMode === 'qr') {
        generateQRCode();
        setStep('qr');
      } else if (attendanceMode === 'manual') {
        setStep('manual');
      } else if (attendanceMode === 'hybrid') {
        generateQRCode();
        setStep('qr');
      }
    }
  };

  const handleBack = () => {
    if (step === 'mode') setStep('selection');
    else if (step === 'qr') setStep('mode');
    else if (step === 'manual') setStep('mode');
    else if (step === 'confirmation') setStep(attendanceMode === 'manual' ? 'manual' : 'qr');
    else if (step === 'review') setStep('confirmation');
  };

  const toggleStudentAttendance = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, present: !student.present } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: true })));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: false })));
  };

  const handleManualSubmit = () => {
    const presentCount = students.filter(s => s.present).length;
    setAttendanceResults({ present: presentCount, total: students.length });
    setStep('confirmation');
  };

  const handleRollNumberSubmit = () => {
    const rollNumbers = rollNumberInput.split(',').map(num => num.trim());
    setStudents(prev => prev.map(student => 
      rollNumbers.includes(student.rollNumber) ? { ...student, present: true } : student
    ));
    setRollNumberInput('');
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setSelectedCourse('cs101');
      setSelectedSection('A');
      setSessionType('Lecture');
      setStep('selection');
    }, 2000);
  };

  const resetModal = () => {
    setStep(initialMode === 'scanner' ? 'scanner' : 'selection');
    setSelectedCourse('');
    setSelectedSection('');
    setSessionType('');
    setAttendanceMode('qr');
    setQrValue('');
    setTimeLeft(180);
    setSessionActive(false);
    setStudents([]);
    setSearchQuery('');
    setIsScanning(false);
    setIsFullscreen(false);
    setRollNumberInput('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed z-50 ${isFullscreen ? 'inset-0 bg-background' : 'inset-0 bg-black/20 flex items-center justify-center p-4'}`}>
      <div className={`${isFullscreen ? 'h-full w-full' : 'bg-background rounded-2xl shadow-2xl border border-border w-full max-w-5xl max-h-[95vh] overflow-hidden'} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold">
              Take Attendance {selectedCourseData && `– ${selectedCourseData.name}`}
            </h2>
            <p className="text-xs text-muted-foreground">{currentDateTime}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)} className="h-8 w-8 p-0">
              {isFullscreen ? <Minimize className="h-3 w-3" /> : <Maximize className="h-3 w-3" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className={`${isFullscreen ? 'flex-1' : ''} p-4 overflow-y-auto`}>
          {/* QR Scanner Step */}
          {step === 'scanner' && (
            <div className="text-center space-y-4">
              <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  {isScanning ? (
                    <div className="space-y-3">
                      <div className="animate-pulse">
                        <QrCode className="h-12 w-12 mx-auto text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Scanning QR Code...</p>
                      <div className="w-32 h-1 bg-muted rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <QrCode className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Position QR code within the frame</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="w-full h-10"
              >
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
            </div>
          )}

          {/* Step 1: Class & Session Selection */}
          {step === 'selection' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Course</label>
                  <select 
                    className="w-full p-2 border border-border rounded-lg bg-background text-sm h-9"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Section/Batch</label>
                  <select 
                    className="w-full p-2 border border-border rounded-lg bg-background text-sm h-9"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section} value={section}>Section {section}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Session Type</label>
                  <select 
                    className="w-full p-2 border border-border rounded-lg bg-background text-sm h-9"
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    {sessionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Date & Time</label>
                  <Input value={currentDateTime} readOnly className="bg-muted/50 text-sm h-9" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleNext}
                  disabled={!selectedCourse || !selectedSection || !sessionType}
                  className="h-9"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Mode Selection */}
          {step === 'mode' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    id: 'qr', 
                    title: 'QR Code Mode', 
                    desc: 'Students scan QR code with mobile app', 
                    icon: QrCode,
                    features: ['Real-time scanning', 'Mobile app integration', 'Automatic marking', 'Live updates'],
                    color: 'blue'
                  },
                  { 
                    id: 'manual', 
                    title: 'Manual Mode', 
                    desc: 'Mark attendance manually from student list', 
                    icon: CheckCircle,
                    features: ['Full control', 'Bulk operations', 'Search & filter', 'Roll number input'],
                    color: 'green'
                  },
                  { 
                    id: 'hybrid', 
                    title: 'Hybrid Mode', 
                    desc: 'Start with QR, then manual adjustment', 
                    icon: Users,
                    features: ['Best of both', 'QR + Manual', 'Review & edit', 'Flexible workflow'],
                    color: 'purple'
                  }
                ].map(mode => {
                  const Icon = mode.icon;
                  const isSelected = attendanceMode === mode.id;
                  return (
                    <Card 
                      key={mode.id}
                      className={`cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
                        isSelected 
                          ? `ring-2 ring-${mode.color}-500 bg-gradient-to-br from-${mode.color}-50 to-white dark:from-${mode.color}-950/20 dark:to-background shadow-lg` 
                          : 'hover:bg-muted/50 hover:shadow-md'
                      }`}
                      onClick={() => {
                        setAttendanceMode(mode.id as AttendanceMode);
                        // Redirect to individual page based on mode
                        if (mode.id === 'qr') {
                          window.open('/attendance/qr-mode', '_blank');
                        } else if (mode.id === 'manual') {
                          window.open('/attendance/manual-mode', '_blank');
                        } else if (mode.id === 'hybrid') {
                          window.open('/attendance/hybrid-mode', '_blank');
                        }
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center ${
                          isSelected 
                            ? `bg-${mode.color}-100 dark:bg-${mode.color}-900/30` 
                            : 'bg-muted'
                        }`}>
                          <Icon className={`h-8 w-8 ${
                            isSelected 
                              ? `text-${mode.color}-600 dark:text-${mode.color}-400` 
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{mode.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{mode.desc}</p>
                        <div className="space-y-2">
                          {mode.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center justify-center gap-2 text-xs">
                              <CheckCircle className={`h-3 w-3 ${
                                isSelected 
                                  ? `text-${mode.color}-500` 
                                  : 'text-muted-foreground'
                              }`} />
                              <span className={isSelected ? 'font-medium' : 'text-muted-foreground'}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                        {isSelected && (
                          <div className="mt-4">
                            <Badge className={`bg-${mode.color}-100 text-${mode.color}-800 dark:bg-${mode.color}-900/50 dark:text-${mode.color}-200`}>
                              Selected
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="text-center space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    💡 <strong>Tip:</strong> Each mode opens in a dedicated page with specialized features
                  </p>
                  <div className="flex justify-center gap-4 text-xs">
                    <span>🔵 QR Mode: Real-time mobile scanning</span>
                    <span>🟢 Manual: Full attendance control</span>
                    <span>🟣 Hybrid: Combined workflow</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button 
                    onClick={() => {
                      // Continue with current modal flow or redirect
                      if (attendanceMode) {
                        handleNext();
                      }
                    }} 
                    className="gap-2"
                    disabled={!attendanceMode}
                  >
                    Continue in Modal <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: QR Code Display */}
          {step === 'qr' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR Code Section */}
              <div className="text-center space-y-6">
                <div className="p-8 bg-muted/30 rounded-xl">
                  {qrValue && (
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <QRCode value={qrValue} size={200} />
                    </div>
                  )}
                </div>
                
                <div>
                  <div className={`text-2xl font-bold mb-2 ${
                    timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-primary'
                  }`}>
                    Valid for {formatTime(timeLeft)}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Students must scan this code with the Attendance Hunters app
                  </p>
                  <Badge className={`${sessionActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {sessionActive ? 'Active Session' : 'Session Expired'}
                  </Badge>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                  <Button variant="outline" onClick={handleBack} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button variant="outline" onClick={generateQRCode} className="gap-2">
                    <RefreshCw className="h-4 w-4" /> Regenerate QR
                  </Button>
                  {attendanceMode === 'hybrid' ? (
                    <Button variant="outline" onClick={() => setStep('review')}>
                      Review & Edit
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setStep('manual')}>
                      Switch to Manual
                    </Button>
                  )}
                </div>
              </div>

              {/* Live Attendance List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Live Attendance</h3>
                  <Badge variant="outline">
                    {students.filter(s => s.present).length} / {students.length} Present
                  </Badge>
                </div>
                
                <div className="rounded-lg border border-border overflow-hidden max-h-96 overflow-y-auto">
                  <div className="bg-muted/50 p-3 border-b border-border">
                    <p className="text-sm font-medium">Students who have scanned:</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {students.filter(s => s.present).length === 0 ? (
                      <p className="text-center text-muted-foreground py-8 text-sm">
                        Waiting for students to scan...
                      </p>
                    ) : (
                      students.filter(s => s.present).map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/30 rounded-md border border-green-200 dark:border-green-800">
                          <div>
                            <p className="font-medium text-sm">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                            Present
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manual Attendance */}
          {step === 'manual' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Mark Attendance Manually</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={markAllPresent}>
                    Mark All Present
                  </Button>
                  <Button variant="outline" size="sm" onClick={markAllAbsent}>
                    Mark All Absent
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter roll numbers (1,2,3...)"
                    value={rollNumberInput}
                    onChange={(e) => setRollNumberInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleRollNumberSubmit}
                    disabled={!rollNumberInput.trim()}
                    size="sm"
                  >
                    Mark Present
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-border overflow-hidden max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Enrollment No.</TableHead>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/30">
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={student.present}
                            onChange={() => toggleStudentAttendance(student.id)}
                            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-muted-foreground">{student.enrollmentNumber}</TableCell>
                        <TableCell className="text-muted-foreground">{student.rollNumber}</TableCell>
                        <TableCell>
                          <Badge variant={student.present ? 'default' : 'secondary'}>
                            {student.present ? 'Present' : 'Absent'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={handleManualSubmit}>
                  Submit Attendance
                </Button>
              </div>
            </div>
          )}

          {/* Review & Edit */}
          {step === 'review' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Review & Edit Attendance</h3>
                <div className="text-sm text-muted-foreground">
                  {students.filter(s => s.present).length} of {students.length} present
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="rounded-lg border border-border overflow-hidden max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Enrollment No.</TableHead>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/30">
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={student.present}
                            onChange={() => toggleStudentAttendance(student.id)}
                            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-muted-foreground">{student.enrollmentNumber}</TableCell>
                        <TableCell className="text-muted-foreground">{student.rollNumber}</TableCell>
                        <TableCell>
                          <Badge variant={student.present ? 'default' : 'secondary'}>
                            {student.present ? 'Present' : 'Absent'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={() => {
                  const presentCount = students.filter(s => s.present).length;
                  setAttendanceResults({ present: presentCount, total: students.length });
                  setStep('confirmation');
                }}>
                  Update & Save
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Attendance Session Complete</h3>
                <div className="space-y-2">
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Attendance captured for {attendanceResults.present} students
                  </p>
                  {attendanceResults.total - attendanceResults.present > 0 && (
                    <p className="text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {attendanceResults.total - attendanceResults.present} students unmarked - please review manually
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setStep('review')}>
                  Review & Edit
                </Button>
                <Button onClick={handleClose}>
                  Save & Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};