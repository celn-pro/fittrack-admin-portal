import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from '../../apollo/client';
import { logout } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, ExitToApp, Brightness4, Brightness7, Shield } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';

const Navbar: React.FC<{ onToggleTheme?: () => void; theme?: string }> = ({ onToggleTheme, theme }) => {
  const currentUser = useReactiveVar(currentUserVar);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="backdrop-blur bg-white/80 dark:bg-gray-900/80 shadow-md rounded-b-lg px-6 py-3 flex justify-between items-center transition-colors duration-300 border-b border-gray-200 dark:border-gray-700">
      <Shield className="text-3xl text-black dark:text-white" /> {/* Replace text with icon */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">
          <AccountCircle className="text-primary dark:text-secondary" />
          <span className="font-medium text-gray-800 dark:text-gray-200">{currentUser?.name || 'Guest'}</span>
        </div>
        {onToggleTheme && (
          <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton onClick={onToggleTheme} color="inherit" size="large" className="transition-colors">
              {theme === 'dark' ? (
                <Brightness7 className="text-yellow-400" />
              ) : (
                <Brightness4 className="text-blue-600" />
              )}
            </IconButton>
          </Tooltip>
        )}
        {currentUser && (
          <Button
            onClick={handleLogout}
            startIcon={<ExitToApp />}
            variant="outlined"
            className="ml-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-700 dark:hover:text-white transition-colors"
            sx={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'currentColor',
              textTransform: 'none',
              fontWeight: 500,
              backgroundColor: 'transparent',
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;