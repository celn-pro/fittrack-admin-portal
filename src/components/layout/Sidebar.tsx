import React from 'react';
import { NavLink } from 'react-router-dom';
import { FitnessCenter, TipsAndUpdates, Info, School, RssFeed } from '@mui/icons-material';

const navItems = [
  { path: '/', label: 'Dashboard', icon: <FitnessCenter /> },
  { path: '/recommendations', label: 'Recommendations', icon: <TipsAndUpdates /> },
  { path: '/health-tips', label: 'Health Tips', icon: <Info /> },
  { path: '/did-you-know', label: 'Did You Know', icon: <Info /> },
  { path: '/courses', label: 'Courses', icon: <School /> },
  { path: '/social-feed', label: 'Social Feed', icon: <RssFeed /> },
];

const Sidebar: React.FC = () => (
  <aside className="w-64 min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 text-gray-900 dark:text-white flex flex-col shadow-lg border-r border-gray-200 dark:border-none transition-colors duration-300">
  <div className="p-6 text-3xl font-extrabold tracking-tight text-center bg-gray-50 dark:bg-gray-900 rounded-b-lg shadow">
    FitTrack
    <span className="block text-base font-light text-gray-400 dark:text-indigo-400">Admin</span>
  </div>
  <nav className="flex-1 mt-6">
    <ul className="space-y-1">
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 rounded-lg mx-2 font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow dark:bg-indigo-600 dark:text-white'
                  : 'hover:bg-gray-100 hover:text-indigo-700 dark:hover:bg-indigo-700 dark:hover:text-indigo-200 text-gray-700 dark:text-indigo-100'
              }`
            }
            end={item.path === '/'}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
</aside>
);

export default Sidebar;