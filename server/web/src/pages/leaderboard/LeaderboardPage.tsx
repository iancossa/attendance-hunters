import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp,
  Search, 
  Filter,
  Crown,
  Target,
  Flame,
  Star,
  Calendar,
  Users
} from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { MOCK_STUDENTS, COURSES } from '../../data/mockStudents';

interface Student {
  id: string;
  rank: number;
  name: string;
  studentId: string;
  class: string;
  attendance: number;
  streak: number;
  badges: number;
  points: number;
  lastActive: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  requirement: string;
}

export const LeaderboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Current Semester');
  const { addNotification } = useAppStore();

  const topStudents: Student[] = MOCK_STUDENTS
    .filter(s => s.status === 'Active' && s.attendance)
    .sort((a, b) => (b.attendance || 0) - (a.attendance || 0))
    .slice(0, 20)
    .map((student, index) => ({
      id: student.id,
      rank: index + 1,
      name: student.name,
      studentId: student.studentId || student.rollNumber,
      class: student.course,
      attendance: student.attendance || 0,
      streak: Math.floor((student.attendance || 0) / 2) + Math.floor(Math.random() * 10),
      badges: Math.floor((student.attendance || 0) / 15) + Math.floor(Math.random() * 3),
      points: Math.floor((student.attendance || 0) * 25) + Math.floor(Math.random() * 200),
      lastActive: student.lastSeen || '2024-01-15'
    }));

  const achievements: Achievement[] = [
    { id: '1', name: 'Perfect Week', description: '100% attendance for a week', icon: <Trophy className="h-5 w-5" />, earned: true, requirement: '7 consecutive days' },
    { id: '2', name: 'Early Bird', description: 'Never late for 30 days', icon: <Award className="h-5 w-5" />, earned: true, requirement: '30 days punctuality' },
    { id: '3', name: 'Consistency King', description: '90%+ attendance for 3 months', icon: <Crown className="h-5 w-5" />, earned: false, progress: 65, requirement: '90 days at 90%+' },
    { id: '4', name: 'Class Champion', description: 'Top attendance in class', icon: <Medal className="h-5 w-5" />, earned: true, requirement: 'Rank #1 in class' },
    { id: '5', name: 'Streak Master', description: '50+ day attendance streak', icon: <Flame className="h-5 w-5" />, earned: false, progress: 80, requirement: '50 consecutive days' },
    { id: '6', name: 'Point Collector', description: 'Earn 2000+ points', icon: <Star className="h-5 w-5" />, earned: true, requirement: '2000 total points' }
  ];

  const filteredStudents = topStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = selectedClass === 'All' || student.class === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'text-green-600 dark:text-green-400';
    if (attendance >= 85) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAttendanceBg = (attendance: number) => {
    if (attendance >= 95) return 'bg-green-500';
    if (attendance >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p className="text-muted-foreground text-sm">Top performing students</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                exportToExcel(filteredStudents, 'leaderboard-rankings');
                addNotification({ message: 'Leaderboard exported successfully', type: 'success' });
              }}
            >
              <Filter className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Trophy className="h-4 w-4" />
              All Time
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Participants</p>
                  <div className="text-2xl font-bold text-primary">{MOCK_STUDENTS.filter(s => s.status === 'Active').length}</div>
                </div>
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Top Performer</p>
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{topStudents[0]?.attendance}%</div>
                </div>
                <Crown className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round(MOCK_STUDENTS.reduce((acc, s) => acc + (s.attendance || 0), 0) / MOCK_STUDENTS.length)}%</div>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{topStudents.reduce((acc, s) => acc + s.badges, 0)}</div>
                </div>
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-10 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-1.5 border border-input bg-background rounded-md text-sm h-9"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="All">All Classes</option>
                  {COURSES.map(course => (
                    <option key={course.id} value={course.id}>{course.code}</option>
                  ))}
                </select>
                <select 
                  className="px-3 py-1.5 border border-input bg-background rounded-md text-sm h-9"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="Current Semester">Current Semester</option>
                  <option value="Last Month">Last Month</option>
                  <option value="All Time">All Time</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topStudents.slice(0, 3).map((student, index) => (
            <Card key={student.rank} className={index === 0 ? 'ring-2 ring-primary' : ''}>
              <CardContent className="p-4 text-center">
                <div className="mb-2">
                  {getRankIcon(student.rank)}
                </div>
                <Avatar className="mx-auto mb-2 h-12 w-12">
                  <AvatarFallback className={`${index === 0 ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{student.name}</h3>
                <Badge variant="outline" className="text-xs mt-1">
                  {student.studentId}
                </Badge>
                <div className={`text-xl font-bold mt-2 ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="h-3 w-3" />
                    <span>{student.streak}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Award className="h-3 w-3" />
                    <span>{student.badges}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Target className="h-3 w-3" />
                    <span>{student.points}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-4 w-4 text-primary" />
                Rankings ({filteredStudents.length})
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground text-xs">
                {selectedPeriod}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Rank</TableHead>
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Attendance</TableHead>
                    <TableHead className="font-semibold">Streak</TableHead>
                    <TableHead className="font-semibold">Badges</TableHead>
                    <TableHead className="font-semibold">Points</TableHead>
                    <TableHead className="font-semibold">Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/30">
                      <TableCell className="py-2">
                        <div className="flex items-center justify-center w-6">
                          {getRankIcon(student.rank)}
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={`${student.rank <= 3 ? 'bg-primary/10 text-primary' : 'bg-muted'} text-xs`}>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.studentId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge variant="outline" className="text-xs">{student.class}</Badge>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium text-sm ${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </span>
                          <div className="w-12 bg-muted rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getAttendanceBg(student.attendance)}`}
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span>{student.streak}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Award className="h-3 w-3 text-blue-500" />
                          <span>{student.badges}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Target className="h-3 w-3 text-purple-500" />
                          {student.points.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="text-sm text-muted-foreground">
                          {student.lastActive}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No students found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-4 w-4 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded ${
                      achievement.earned 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        {achievement.earned ? (
                          <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs">
                            Earned
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                      {!achievement.earned && achievement.progress && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};