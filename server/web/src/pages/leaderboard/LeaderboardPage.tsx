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

  const topStudents: Student[] = [
    { id: '1', rank: 1, name: 'Alice Johnson', studentId: 'STU001', class: 'CS101', attendance: 98.5, streak: 45, badges: 12, points: 2450, lastActive: '2024-01-15' },
    { id: '2', rank: 2, name: 'Bob Smith', studentId: 'STU002', class: 'MATH201', attendance: 96.8, streak: 38, badges: 10, points: 2280, lastActive: '2024-01-15' },
    { id: '3', rank: 3, name: 'Carol Davis', studentId: 'STU003', class: 'PHY101', attendance: 95.2, streak: 32, badges: 9, points: 2150, lastActive: '2024-01-14' },
    { id: '4', rank: 4, name: 'David Wilson', studentId: 'STU004', class: 'ENG101', attendance: 94.7, streak: 28, badges: 8, points: 2080, lastActive: '2024-01-14' },
    { id: '5', rank: 5, name: 'Emma Brown', studentId: 'STU005', class: 'BIO101', attendance: 93.9, streak: 25, badges: 7, points: 1990, lastActive: '2024-01-13' },
    { id: '6', rank: 6, name: 'Frank Miller', studentId: 'STU006', class: 'CS101', attendance: 92.8, streak: 22, badges: 6, points: 1850, lastActive: '2024-01-13' },
    { id: '7', rank: 7, name: 'Grace Lee', studentId: 'STU007', class: 'MATH201', attendance: 91.5, streak: 18, badges: 5, points: 1720, lastActive: '2024-01-12' },
    { id: '8', rank: 8, name: 'Henry Clark', studentId: 'STU008', class: 'PHY101', attendance: 90.2, streak: 15, badges: 4, points: 1650, lastActive: '2024-01-12' }
  ];

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
            <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">Top performing students and achievements</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                exportToExcel(filteredStudents, 'leaderboard-rankings');
                addNotification({ message: 'Leaderboard exported successfully', type: 'success' });
              }}
            >
              <Filter className="h-4 w-4" />
              Export Rankings
            </Button>
            <Button className="gap-2">
              <Trophy className="h-4 w-4" />
              View All Time
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                  <div className="text-3xl font-bold text-primary mt-2">402</div>
                  <p className="text-xs text-muted-foreground mt-1">active students</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 dark:from-yellow-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Performer</p>
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">98.5%</div>
                  <p className="text-xs text-muted-foreground mt-1">Alice Johnson</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">87.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">all participants</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">156</div>
                  <p className="text-xs text-muted-foreground mt-1">badges earned</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                  placeholder="Search students by name, ID, or class..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="All">All Classes</option>
                  <option value="CS101">CS101</option>
                  <option value="MATH201">MATH201</option>
                  <option value="PHY101">PHY101</option>
                  <option value="ENG101">ENG101</option>
                  <option value="BIO101">BIO101</option>
                </select>
                <select 
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topStudents.slice(0, 3).map((student, index) => (
            <Card key={student.rank} className={`${index === 0 ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'} transition-all hover:shadow-md`}>
              <CardContent className="pt-6 text-center">
                <div className="mb-3">
                  {getRankIcon(student.rank)}
                </div>
                <Avatar className="mx-auto mb-3 h-16 w-16">
                  <AvatarFallback className={`text-lg ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{student.name}</h3>
                <Badge variant="outline" className="text-xs mt-1 mb-2">
                  {student.studentId}
                </Badge>
                <div className={`text-2xl font-bold mt-2 ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <Flame className="h-3 w-3" />
                    <span>{student.streak} days</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <Award className="h-3 w-3" />
                    <span>{student.badges} badges</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground col-span-2">
                    <Target className="h-3 w-3" />
                    <span>{student.points} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                Rankings ({filteredStudents.length})
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground">
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
                    <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center justify-center w-8">
                          {getRankIcon(student.rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={`${student.rank <= 3 ? 'bg-primary/10 text-primary' : 'bg-muted'} font-medium`}>
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
                        <Badge variant="outline">{student.class}</Badge>
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
                        <div className="flex items-center gap-1 text-sm">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span className="font-medium">{student.streak}</span> days
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Award className="h-3 w-3 text-blue-500" />
                          <span className="font-medium">{student.badges}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <Target className="h-3 w-3 text-purple-500" />
                          {student.points.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {student.lastActive}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No students found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="h-4 w-4 text-primary" />
              </div>
              Available Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    achievement.earned 
                      ? 'border-primary bg-gradient-to-r from-primary/5 to-transparent' 
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.earned 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{achievement.name}</h4>
                        {achievement.earned ? (
                          <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700">
                            Earned!
                          </Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.requirement}</p>
                      {!achievement.earned && achievement.progress && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
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