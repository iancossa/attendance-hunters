import React from 'react';
import { ROUTES } from '../../constants';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: '📊' },
    { name: 'Attendance', path: ROUTES.ATTENDANCE, icon: '✅' },
    { name: 'Classes', path: ROUTES.CLASSES, icon: '🏫' },
    { name: 'Reports', path: ROUTES.REPORTS, icon: '📈' },
    { name: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: '🏆' },
    { name: 'Settings', path: ROUTES.SETTINGS, icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
};