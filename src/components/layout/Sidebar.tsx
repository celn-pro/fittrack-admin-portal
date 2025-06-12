import React from 'react';
import { NavLink } from 'react-router-dom';
import { FitnessCenter, TipsAndUpdates, Info, School, RssFeed } from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FitnessCenter /> },
    { path: '/recommendations', label: 'Recommendations', icon: <TipsAndUpdates /> },
    { path: '/health-tips', label: 'Health Tips', icon: <Info /> },
    { path: '/did-you-know', label: 'Did You Know', icon: <Info /> },
    { path: '/courses', label: 'Courses', icon: <School /> },
    { path: '/social-feed', label: 'Social Feed', icon: <RssFeed /> },
  ];

  return (
    <aside className="w-64 bg-primary text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">FitTrack Admin</div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-4 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`
                }
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;