import React, { useState, useMemo } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { 
  Users, 
  UserPlus, 
  GraduationCap, 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  TrendingUp,
  AlertCircle,
  Download,
  Upload,
  Eye,
  Edit,
  MessageSquare,
  History
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  class: string;
  section: string;
  year: string;
  department: string;
  attendance: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastSeen: string;
  phone: string;
  enrollmentDate: string;
  gpa: number;
}

const mockStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice.johnson@university.edu', studentId: 'CS101-A-001', class: 'Data Structures', section: 'A', year: '2024', department: 'Computer Science', attendance: 92, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 123-4567', enrollmentDate: '2024-01-10', gpa: 3.8 },
  { id: '2', name: 'Bob Smith', email: 'bob.smith@university.edu', studentId: 'MATH201-B-002', class: 'Calculus II', section: 'B', year: '2024', department: 'Mathematics', attendance: 88, status: 'Active', lastSeen: '2024-01-14', phone: '+1 (555) 234-5678', enrollmentDate: '2024-01-10', gpa: 3.6 },
  { id: '3', name: 'Carol Davis', email: 'carol.davis@university.edu', studentId: 'PHY101-A-003', class: 'Physics I', section: 'A', year: '2023', department: 'Physics', attendance: 76, status: 'Active', lastSeen: '2024-01-13', phone: '+1 (555) 345-6789', enrollmentDate: '2023-01-10', gpa: 3.4 },
  { id: '4', name: 'David Wilson', email: 'david.wilson@university.edu', studentId: 'ENG101-C-004', class: 'English Literature', section: 'C', year: '2024', department: 'English', attendance: 95, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 456-7890', enrollmentDate: '2024-01-10', gpa: 3.9 },
  { id: '5', name: 'Eva Brown', email: 'eva.brown@university.edu', studentId: 'BIO201-A-005', class: 'Biology II', section: 'A', year: '2023', department: 'Biology', attendance: 68, status: 'Inactive', lastSeen: '2024-01-10', phone: '+1 (555) 567-8901', enrollmentDate: '2023-01-10', gpa: 3.2 },
  { id: '6', name: 'Frank Miller', email: 'frank.miller@university.edu', studentId: 'CS101-B-006', class: 'Data Structures', section: 'B', year: '2024', department: 'Computer Science', attendance: 82, status: 'Active', lastSeen: '2024-01-14', phone: '+1 (555) 678-9012', enrollmentDate: '2024-01-10', gpa: 3.5 },
  { id: '7', name: 'Grace Lee', email: 'grace.lee@university.edu', studentId: 'MATH201-A-007', class: 'Calculus II', section: 'A', year: '2024', department: 'Mathematics', attendance: 91, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 789-0123', enrollmentDate: '2024-01-10', gpa: 3.7 },
  { id: '8', name: 'Henry Clark', email: 'henry.clark@university.edu', studentId: 'PHY101-B-008', class: 'Physics I', section: 'B', year: '2023', department: 'Physics', attendance: 59, status: 'Suspended', lastSeen: '2024-01-08', phone: '+1 (555) 890-1234', enrollmentDate: '2023-01-10', gpa: 2.8 },
  { id: '9', name: 'Isabella Garcia', email: 'isabella.garcia@university.edu', studentId: 'CHEM101-A-009', class: 'General Chemistry', section: 'A', year: '2024', department: 'Chemistry', attendance: 87, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 901-2345', enrollmentDate: '2024-01-10', gpa: 3.6 },
  { id: '10', name: 'Jack Thompson', email: 'jack.thompson@university.edu', studentId: 'HIST201-B-010', class: 'World History', section: 'B', year: '2023', department: 'History', attendance: 73, status: 'Active', lastSeen: '2024-01-12', phone: '+1 (555) 012-3456', enrollmentDate: '2023-01-10', gpa: 3.3 },
  { id: '11', name: 'Kate Rodriguez', email: 'kate.rodriguez@university.edu', studentId: 'ART101-C-011', class: 'Fine Arts', section: 'C', year: '2024', department: 'Arts', attendance: 94, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 123-4567', enrollmentDate: '2024-01-10', gpa: 3.8 },
  { id: '12', name: 'Liam Anderson', email: 'liam.anderson@university.edu', studentId: 'ECON201-A-012', class: 'Microeconomics', section: 'A', year: '2023', department: 'Economics', attendance: 81, status: 'Active', lastSeen: '2024-01-14', phone: '+1 (555) 234-5678', enrollmentDate: '2023-01-10', gpa: 3.5 },
  { id: '13', name: 'Maya Patel', email: 'maya.patel@university.edu', studentId: 'PSYC101-B-013', class: 'Psychology', section: 'B', year: '2024', department: 'Psychology', attendance: 89, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 345-6789', enrollmentDate: '2024-01-10', gpa: 3.7 },
  { id: '14', name: 'Noah Williams', email: 'noah.williams@university.edu', studentId: 'SOC201-C-014', class: 'Sociology', section: 'C', year: '2023', department: 'Sociology', attendance: 65, status: 'Inactive', lastSeen: '2024-01-09', phone: '+1 (555) 456-7890', enrollmentDate: '2023-01-10', gpa: 3.1 },
  { id: '15', name: 'Olivia Martinez', email: 'olivia.martinez@university.edu', studentId: 'MUS101-A-015', class: 'Music Theory', section: 'A', year: '2024', department: 'Music', attendance: 96, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 567-8901', enrollmentDate: '2024-01-10', gpa: 3.9 },
  { id: '16', name: 'Paul Jackson', email: 'paul.jackson@university.edu', studentId: 'PE101-B-016', class: 'Physical Education', section: 'B', year: '2024', department: 'Physical Education', attendance: 78, status: 'Active', lastSeen: '2024-01-13', phone: '+1 (555) 678-9012', enrollmentDate: '2024-01-10', gpa: 3.4 },
  { id: '17', name: 'Quinn Taylor', email: 'quinn.taylor@university.edu', studentId: 'PHIL201-A-017', class: 'Philosophy', section: 'A', year: '2023', department: 'Philosophy', attendance: 85, status: 'Active', lastSeen: '2024-01-14', phone: '+1 (555) 789-0123', enrollmentDate: '2023-01-10', gpa: 3.6 },
  { id: '18', name: 'Rachel White', email: 'rachel.white@university.edu', studentId: 'GEOL101-C-018', class: 'Geology', section: 'C', year: '2024', department: 'Geology', attendance: 72, status: 'Active', lastSeen: '2024-01-12', phone: '+1 (555) 890-1234', enrollmentDate: '2024-01-10', gpa: 3.3 },
  { id: '19', name: 'Samuel Harris', email: 'samuel.harris@university.edu', studentId: 'STAT201-B-019', class: 'Statistics', section: 'B', year: '2023', department: 'Statistics', attendance: 90, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 901-2345', enrollmentDate: '2023-01-10', gpa: 3.7 },
  { id: '20', name: 'Tina Lewis', email: 'tina.lewis@university.edu', studentId: 'ANTH101-A-020', class: 'Anthropology', section: 'A', year: '2024', department: 'Anthropology', attendance: 83, status: 'Active', lastSeen: '2024-01-14', phone: '+1 (555) 012-3456', enrollmentDate: '2024-01-10', gpa: 3.5 },
  { id: '21', name: 'Uma Singh', email: 'uma.singh@university.edu', studentId: 'LING201-B-021', class: 'Linguistics', section: 'B', year: '2023', department: 'Linguistics', attendance: 77, status: 'Active', lastSeen: '2024-01-13', phone: '+1 (555) 123-4567', enrollmentDate: '2023-01-10', gpa: 3.4 },
  { id: '22', name: 'Victor Chen', email: 'victor.chen@university.edu', studentId: 'ARCH101-C-022', class: 'Architecture', section: 'C', year: '2024', department: 'Architecture', attendance: 88, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 234-5678', enrollmentDate: '2024-01-10', gpa: 3.6 },
  { id: '23', name: 'Wendy Kim', email: 'wendy.kim@university.edu', studentId: 'JOUR201-A-023', class: 'Journalism', section: 'A', year: '2023', department: 'Journalism', attendance: 92, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 345-6789', enrollmentDate: '2023-01-10', gpa: 3.8 },
  { id: '24', name: 'Xavier Lopez', email: 'xavier.lopez@university.edu', studentId: 'THEA101-B-024', class: 'Theater Arts', section: 'B', year: '2024', department: 'Theater', attendance: 86, status: 'Active', lastSeen: '2024-01-14', phone: '+1 (555) 456-7890', enrollmentDate: '2024-01-10', gpa: 3.6 },
  { id: '25', name: 'Yuki Tanaka', email: 'yuki.tanaka@university.edu', studentId: 'LANG101-C-025', class: 'Foreign Languages', section: 'C', year: '2024', department: 'Languages', attendance: 94, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 567-8901', enrollmentDate: '2024-01-10', gpa: 3.9 },
  { id: '26', name: 'Zoe Mitchell', email: 'zoe.mitchell@university.edu', studentId: 'NURS201-A-026', class: 'Nursing', section: 'A', year: '2023', department: 'Nursing', attendance: 97, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 678-9012', enrollmentDate: '2023-01-10', gpa: 4.0 },
  { id: '27', name: 'Aaron Cooper', email: 'aaron.cooper@university.edu', studentId: 'AGRI101-B-027', class: 'Agriculture', section: 'B', year: '2024', department: 'Agriculture', attendance: 75, status: 'Active', lastSeen: '2024-01-13', phone: '+1 (555) 789-0123', enrollmentDate: '2024-01-10', gpa: 3.3 },
  { id: '28', name: 'Bella Reed', email: 'bella.reed@university.edu', studentId: 'DENT201-C-028', class: 'Dentistry', section: 'C', year: '2023', department: 'Dentistry', attendance: 91, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 890-1234', enrollmentDate: '2023-01-10', gpa: 3.8 },
  { id: '29', name: 'Carlos Rivera', email: 'carlos.rivera@university.edu', studentId: 'VET101-A-029', class: 'Veterinary Science', section: 'A', year: '2024', department: 'Veterinary', attendance: 84, status: 'Active', lastSeen: '2024-01-14', phone: '+1 (555) 901-2345', enrollmentDate: '2024-01-10', gpa: 3.5 },
  { id: '30', name: 'Diana Foster', email: 'diana.foster@university.edu', studentId: 'LAW201-B-030', class: 'Legal Studies', section: 'B', year: '2023', department: 'Law', attendance: 89, status: 'Active', lastSeen: '2024-01-15', phone: '+1 (555) 012-3456', enrollmentDate: '2023-01-10', gpa: 3.7 }
];

export const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [attendanceFilter, setAttendanceFilter] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const departments = Array.from(new Set(mockStudents.map(s => s.department)));
  const sections = Array.from(new Set(mockStudents.map(s => s.section)));
  const years = Array.from(new Set(mockStudents.map(s => s.year)));

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = selectedYear === 'All' || student.year === selectedYear;
      const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
      const matchesDepartment = selectedDepartment === 'All' || student.department === selectedDepartment;
      const matchesSection = selectedSection === 'All' || student.section === selectedSection;
      
      const matchesAttendance = 
        attendanceFilter === 'All' ||
        (attendanceFilter === 'High' && student.attendance >= 85) ||
        (attendanceFilter === 'Medium' && student.attendance >= 70 && student.attendance < 85) ||
        (attendanceFilter === 'Low' && student.attendance < 70);
      
      return matchesSearch && matchesYear && matchesStatus && matchesDepartment && matchesSection && matchesAttendance;
    });
  }, [searchTerm, selectedYear, selectedStatus, selectedDepartment, selectedSection, attendanceFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedYear('All');
    setSelectedStatus('All');
    setSelectedDepartment('All');
    setSelectedSection('All');
    setAttendanceFilter('All');
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600 dark:text-green-400';
    if (attendance >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAttendanceBg = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-500';
    if (attendance >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'Inactive':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Suspended':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground mt-1">Manage student records and track academic progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>

          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <div className="text-2xl font-bold text-primary mt-1">{mockStudents.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">enrolled students</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{mockStudents.filter(s => s.status === 'Active').length}</div>
                  <p className="text-xs text-muted-foreground mt-1">currently enrolled</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{Math.round(mockStudents.reduce((acc, s) => acc + s.attendance, 0) / mockStudents.length)}%</div>
                  <p className="text-xs text-muted-foreground mt-1">this semester</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 dark:from-red-950/30 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{mockStudents.filter(s => s.attendance < 70).length}</div>
                  <p className="text-xs text-muted-foreground mt-1">below 70% attendance</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID, email, class, or department..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <select 
                className="p-2 border border-border rounded-md bg-background text-sm"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select 
                className="p-2 border border-border rounded-md bg-background text-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select 
                className="p-2 border border-border rounded-md bg-background text-sm"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="All">All Sections</option>
                {sections.map(section => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
              <select 
                className="p-2 border border-border rounded-md bg-background text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
              <select 
                className="p-2 border border-border rounded-md bg-background text-sm"
                value={attendanceFilter}
                onChange={(e) => setAttendanceFilter(e.target.value)}
              >
                <option value="All">All Attendance</option>
                <option value="High">High (85%+)</option>
                <option value="Medium">Medium (70-84%)</option>
                <option value="Low">Low (&lt;70%)</option>
              </select>
              <Button variant="outline" onClick={clearFilters} className="text-sm">
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                All Students ({filteredStudents.length})
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground">
                Academic Year 2024-25
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Academic Info</TableHead>
                    <TableHead className="font-semibold">Attendance</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Last Seen</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {student.studentId}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {student.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{student.class}</div>
                          <div className="text-xs text-muted-foreground">{student.department} - Section {student.section}</div>
                          <div className="text-xs text-muted-foreground">Year {student.year}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getAttendanceBg(student.attendance)}`}
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {student.lastSeen}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button 
                            className="h-8 w-8 p-0 hover:bg-muted/80 transition-colors rounded-md flex items-center justify-center border border-transparent hover:border-border"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === student.id ? null : student.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {openDropdown === student.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-50 py-1 animate-in slide-in-from-top-2">
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left rounded-sm"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Profile
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left rounded-sm"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit Details
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left rounded-sm"
                                >
                                  <History className="h-4 w-4" />
                                  Attendance History
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left rounded-sm"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  Send Message
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No students found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};