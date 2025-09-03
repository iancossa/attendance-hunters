import React from 'react';
import { ROUTES } from '../../constants';
import { BarChart3, CheckSquare, GraduationCap, FileText, Trophy, Settings } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: BarChart3 },
    { name: 'Attendance', path: ROUTES.ATTENDANCE, icon: CheckSquare },
    { name: 'Classes', path: ROUTES.CLASSES, icon: GraduationCap },
    { name: 'Reports', path: ROUTES.REPORTS, icon: FileText },
    { name: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: Trophy },
    { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <aside className="w-56 bg-background border-r border-border">
      <nav className="p-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </a>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};