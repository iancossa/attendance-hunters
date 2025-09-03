import React, { useState } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Target, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  UserCircle, 
  HelpCircle,
  Plus,
  Calendar,
  Users,
  BookOpen,
  Palette,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  Circle
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [quickActionDropdownOpen, setQuickActionDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('system');

  const notifications = [
    { id: 1, title: 'Low Attendance Alert', message: 'PHY101 dropped below 80%', time: '5m ago', type: 'warning', icon: <Bell className="h-4 w-4" /> },
    { id: 2, title: 'New Student Enrolled', message: 'Alice Johnson joined CS101', time: '1h ago', type: 'info', icon: <Users className="h-4 w-4" /> },
    { id: 3, title: 'Report Generated', message: 'Weekly attendance report ready', time: '2h ago', type: 'success', icon: <BookOpen className="h-4 w-4" /> }
  ];

  const themeOptions = [
    { id: 'light', name: 'Light', icon: <Sun className="h-4 w-4" /> },
    { id: 'dark', name: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { id: 'system', name: 'System', icon: <Monitor className="h-4 w-4" /> }
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Attendance Hunters
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Academic Year 2024-25
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search students, classes, or reports..."
                className="pl-10 bg-muted/50 border-0 focus:bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-4 w-4" />
            </Button>

            {/* Quick Actions */}
            <DropdownMenu open={quickActionDropdownOpen} onOpenChange={setQuickActionDropdownOpen}>
              <DropdownMenuTrigger onClick={() => setQuickActionDropdownOpen(!quickActionDropdownOpen)}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Quick Add</span>
                </Button>
              </DropdownMenuTrigger>
              {quickActionDropdownOpen && (
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setQuickActionDropdownOpen(false)}>
                    <Users className="h-4 w-4 mr-2" />
                    Add Student
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuickActionDropdownOpen(false)}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Class
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuickActionDropdownOpen(false)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu open={notificationDropdownOpen} onOpenChange={setNotificationDropdownOpen}>
              <DropdownMenuTrigger onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              {notificationDropdownOpen && (
                <DropdownMenuContent className="w-80">
                  <div className="p-3 border-b">
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground">{notificationCount} unread</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer" onClick={() => setNotificationDropdownOpen(false)}>
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-1.5 rounded-full ${
                            notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                            notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                            'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <div className="border-t mx-1" />
                  <DropdownMenuItem className="p-3 text-center text-sm text-primary cursor-pointer" onClick={() => setNotificationDropdownOpen(false)}>
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>



            {/* User Menu */}
            <DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
              <DropdownMenuTrigger onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      JA
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              {userDropdownOpen && (
                <DropdownMenuContent className="w-56">
                  <div className="p-3 border-b">
                    <p className="font-medium">John Admin</p>
                    <p className="text-sm text-muted-foreground">john.admin@university.edu</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      Administrator
                    </Badge>
                  </div>
                  <DropdownMenuItem onClick={() => setUserDropdownOpen(false)}>
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <div className="relative">
                    <DropdownMenuItem 
                      onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Palette className="h-4 w-4 mr-2" />
                        Theme
                      </div>
                      <ChevronRight className="h-3 w-3" />
                    </DropdownMenuItem>
                    {themeDropdownOpen && (
                      <div className="absolute right-full top-0 mr-1 w-40 bg-card border rounded-lg shadow-xl z-50 py-1">
                        {themeOptions.map((theme) => (
                          <div
                            key={theme.id}
                            className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                            onClick={() => {
                              setCurrentTheme(theme.id);
                              setThemeDropdownOpen(false);
                            }}
                          >
                            <div className="flex items-center">
                              {theme.icon}
                              <span className="ml-2">{theme.name}</span>
                            </div>
                            {currentTheme === theme.id ? (
                              <Circle className="h-2 w-2 fill-primary text-primary" />
                            ) : (
                              <Circle className="h-2 w-2 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <DropdownMenuItem onClick={() => setUserDropdownOpen(false)}>
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUserDropdownOpen(false)}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </DropdownMenuItem>
                  <div className="border-t mx-1" />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => setUserDropdownOpen(false)}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};