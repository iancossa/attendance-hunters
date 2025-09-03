import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  class: string;
  year: string;
  attendance: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastSeen: string;
  phone: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    studentId: 'STU001',
    class: 'Computer Science',
    year: '3rd Year',
    attendance: 92,
    status: 'Active',
    lastSeen: '2024-01-15',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    studentId: 'STU002',
    class: 'Mathematics',
    year: '2nd Year',
    attendance: 88,
    status: 'Active',
    lastSeen: '2024-01-14',
    phone: '+1 (555) 234-5678'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    studentId: 'STU003',
    class: 'Physics',
    year: '4th Year',
    attendance: 76,
    status: 'Active',
    lastSeen: '2024-01-13',
    phone: '+1 (555) 345-6789'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    studentId: 'STU004',
    class: 'Chemistry',
    year: '1st Year',
    attendance: 95,
    status: 'Active',
    lastSeen: '2024-01-15',
    phone: '+1 (555) 456-7890'
  },
  {
    id: '5',
    name: 'Eva Brown',
    email: 'eva.brown@email.com',
    studentId: 'STU005',
    class: 'Biology',
    year: '3rd Year',
    attendance: 68,
    status: 'Inactive',
    lastSeen: '2024-01-10',
    phone: '+1 (555) 567-8901'
  }
];

export const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === 'All' || student.year === selectedYear;
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
    
    return matchesSearch && matchesYear && matchesStatus;
  });

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
              <Filter className="h-4 w-4" />
              Export Data
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <div className="text-3xl font-bold text-primary mt-2">402</div>
                  <p className="text-xs text-muted-foreground mt-1">enrolled students</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">385</div>
                  <p className="text-xs text-muted-foreground mt-1">currently enrolled</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">84%</div>
                  <p className="text-xs text-muted-foreground mt-1">this semester</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 dark:from-red-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">17</div>
                  <p className="text-xs text-muted-foreground mt-1">below 75% attendance</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search students by name, ID, email, or class..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="All">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                <select 
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
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
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {student.studentId}
                            </Badge>
                          </div>
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
                          <div className="text-xs text-muted-foreground">{student.year}</div>
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
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-muted/80 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === student.id ? null : student.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          {openDropdown === student.id && (
                            <>
                              <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40" onClick={() => setOpenDropdown(null)} />
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">View Profile</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Edit Details</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Attendance History</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Send Message</div>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </>
                          )}
                        </DropdownMenu>
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