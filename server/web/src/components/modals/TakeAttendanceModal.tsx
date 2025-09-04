import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { X, QrCode, UserCheck, Zap, Calendar, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';

interface TakeAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'scanner' | 'attendance';
}

export const TakeAttendanceModal: React.FC<TakeAttendanceModalProps> = ({ isOpen, onClose, initialMode = 'attendance' }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  const courses = [
    { id: 'cs101', name: 'CSE101 – Data Structures', section: 'Computer Science', students: 50 },
    { id: 'math201', name: 'MATH201 – Calculus II', section: 'Mathematics', students: 42 },
    { id: 'eng101', name: 'ENG101 – English Literature', section: 'English', students: 35 },
    { id: 'phy101', name: 'PHY101 – Physics I', section: 'Physics', students: 38 },
  ];

  const sections = ['A', 'B', 'C', 'D'];
  const sessionTypes = ['Lecture', 'Lab', 'Tutorial', 'Seminar'];

  const attendanceModes = [
    {
      id: 'qr',
      title: 'QR Code Mode',
      description: 'Students scan QR code with their mobile devices',
      icon: QrCode,
      color: 'blue',
      features: ['Real-time scanning', 'Mobile app required', 'Automatic marking'],
      route: '/attendance/qr-mode'
    },
    {
      id: 'manual',
      title: 'Manual Mode', 
      description: 'Mark attendance manually from student list',
      icon: UserCheck,
      color: 'green',
      features: ['Full control', 'No mobile app needed', 'Bulk operations'],
      route: '/attendance/manual-mode'
    },
    {
      id: 'hybrid',
      title: 'Hybrid Mode',
      description: 'Combine QR scanning with manual adjustments',
      icon: Zap,
      color: 'purple', 
      features: ['Best of both worlds', 'Flexible workflow', 'Review & edit'],
      route: '/attendance/hybrid-mode'
    }
  ];

  const handleProceed = () => {
    if (!selectedCourse || !selectedSection || !sessionType || !selectedMode) return;
    
    const selectedModeData = attendanceModes.find(mode => mode.id === selectedMode);
    if (selectedModeData) {
      // Store session data in localStorage for the attendance page to use
      const sessionData = {
        courseId: selectedCourse,
        section: selectedSection,
        sessionType,
        timestamp: Date.now(),
        courseName: courses.find(c => c.id === selectedCourse)?.name
      };
      localStorage.setItem('attendanceSession', JSON.stringify(sessionData));
      
      // Navigate to the selected mode page
      window.location.href = selectedModeData.route;
    }
  };

  const isFormValid = selectedCourse && selectedSection && sessionType && selectedMode;
  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Setup Attendance Session</h2>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Course Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Course
                </label>
                <select 
                  value={selectedCourse} 
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-background"
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.students} students)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Section
                </label>
                <select 
                  value={selectedSection} 
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-background"
                  disabled={!selectedCourse}
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Session Type
                </label>
                <select 
                  value={sessionType} 
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-background"
                  disabled={!selectedCourse}
                >
                  <option value="">Select Type</option>
                  {sessionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date & Time</label>
                <Input 
                  value={new Date().toLocaleString()} 
                  readOnly 
                  className="bg-muted/50" 
                />
              </div>
            </div>
          </div>

          {/* Course Info */}
          {selectedCourseData && (
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedCourseData.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCourseData.section} • {selectedCourseData.students} students
                    {selectedSection && ` • Section ${selectedSection}`}
                    {sessionType && ` • ${sessionType}`}
                  </p>
                </div>
                <Badge variant="outline">{selectedCourseData.students} students</Badge>
              </div>
            </Card>
          )}

          {/* Attendance Mode Selection */}
          {selectedCourse && selectedSection && sessionType && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Choose Attendance Mode</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {attendanceModes.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = selectedMode === mode.id;
                  return (
                    <Card 
                      key={mode.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-accent'
                      }`}
                      onClick={() => setSelectedMode(mode.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            mode.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            mode.color === 'green' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{mode.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                            <div className="space-y-1">
                              {mode.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="w-1 h-1 bg-current rounded-full" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleProceed}
              disabled={!isFormValid}
              className="flex items-center gap-2"
            >
              Start Attendance Session
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};