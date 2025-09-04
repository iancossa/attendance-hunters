import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { FileText, Download, TrendingUp, Users, AlertTriangle, Calendar, Search, BarChart3, MoreVertical } from 'lucide-react';
import { AttendanceChart, ClassPerformanceChart } from '../../components/charts';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';
import { useAppStore } from '../../store';

interface ReportData {
  id: string;
  type: string;
  class: string;
  period: string;
  attendance: number;
  students: number;
  generated: string;
  status: 'Generated' | 'Processing' | 'Failed';
}

const mockReports: ReportData[] = [
  {
    id: '1',
    type: 'Weekly Report',
    class: 'CS101 - Data Structures',
    period: 'Jan 8-14, 2024',
    attendance: 94.2,
    students: 45,
    generated: '2024-01-15',
    status: 'Generated'
  },
  {
    id: '2',
    type: 'Monthly Report',
    class: 'MATH201 - Calculus II',
    period: 'December 2023',
    attendance: 89.8,
    students: 38,
    generated: '2024-01-01',
    status: 'Generated'
  },
  {
    id: '3',
    type: 'Semester Report',
    class: 'ENG101 - English Literature',
    period: 'Fall 2023',
    attendance: 82.5,
    students: 52,
    generated: '2024-01-10',
    status: 'Processing'
  },
  {
    id: '4',
    type: 'Weekly Report',
    class: 'PHY101 - Physics I',
    period: 'Jan 1-7, 2024',
    attendance: 78.3,
    students: 41,
    generated: '2024-01-08',
    status: 'Generated'
  }
];

export const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { addNotification } = useAppStore();

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.period.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || report.type === selectedType;
    
    return matchesSearch && matchesType;
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
      case 'Generated':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'Processing':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Failed':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Comprehensive attendance insights and analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button 
              className="gap-2"
              onClick={() => {
                exportToExcel(filteredReports, 'reports-data');
                addNotification({ message: 'Reports exported successfully', type: 'success' });
              }}
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search reports by type, class, or period..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Weekly Report">Weekly Report</option>
                  <option value="Monthly Report">Monthly Report</option>
                  <option value="Semester Report">Semester Report</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <div className="text-3xl font-bold text-primary mt-2">156</div>
                  <p className="text-xs text-muted-foreground mt-1">generated this year</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">87.5%</div>
                  <p className="text-xs text-muted-foreground mt-1">semester average</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Best Performing</p>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">CS101</div>
                  <p className="text-xs text-muted-foreground mt-1">94.2% attendance</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 dark:from-red-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">At-Risk Students</p>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">23</div>
                  <p className="text-xs text-muted-foreground mt-1">below 75% attendance</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                Generated Reports ({filteredReports.length})
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
                    <TableHead className="font-semibold">Report Details</TableHead>
                    <TableHead className="font-semibold">Class & Period</TableHead>
                    <TableHead className="font-semibold">Attendance Rate</TableHead>
                    <TableHead className="font-semibold">Students</TableHead>
                    <TableHead className="font-semibold">Generated</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.type}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            ID: {report.id}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{report.class}</div>
                          <div className="text-xs text-muted-foreground">{report.period}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getAttendanceColor(report.attendance)}`}>
                            {report.attendance}%
                          </span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getAttendanceBg(report.attendance)}`}
                              style={{ width: `${report.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          {report.students}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {report.generated}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
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
                                setOpenDropdown(openDropdown === report.id ? null : report.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          {openDropdown === report.id && (
                            <>
                              <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40" onClick={() => setOpenDropdown(null)} />
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">View Report</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Download PDF</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Export Data</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Share Report</div>
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
            
            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No reports found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceChart data={[
                { day: 'Jan', attendance: 87 },
                { day: 'Feb', attendance: 89 },
                { day: 'Mar', attendance: 85 },
                { day: 'Apr', attendance: 91 },
                { day: 'May', attendance: 88 }
              ]} />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClassPerformanceChart data={[
                { class: 'CS', attendance: 92 },
                { class: 'Math', attendance: 88 },
                { class: 'Physics', attendance: 84 },
                { class: 'English', attendance: 79 }
              ]} />
            </CardContent>
          </Card>
        </div>

        {/* Quick Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                Class Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">CS101 - Data Structures</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">94.2%</span>
                </div>
                <Progress value={94.2} />
              </div>
              <div className="p-3 bg-gradient-to-r from-primary/10 dark:from-primary/20 to-transparent rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">MATH201 - Calculus II</span>
                  <span className="text-sm font-semibold text-primary">89.8%</span>
                </div>
                <Progress value={89.8} />
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 dark:from-yellow-950/30 to-transparent rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">ENG101 - English Literature</span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">82.5%</span>
                </div>
                <Progress value={82.5} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                </div>
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">Low Attendance Alert</p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">PHY101 dropped below 80% this week</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                  <Users className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-red-800 dark:text-red-300">Critical Alert</p>
                  <p className="text-sm text-red-600 dark:text-red-400">5 students missed 25%+ of classes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};