import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from '../../apollo/client';
import { logout } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { Button } from '@mui/material';

const Navbar: React.FC = () => {
  const currentUser = useReactiveVar(currentUserVar);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Portal</h1>
      <div className="flex items-center">
        <AccountCircle className="mr-2" />
        <span>{currentUser?.name || 'Guest'}</span>
        {currentUser && (
          <Button onClick={handleLogout} startIcon={<ExitToApp />} sx={{ ml: 2 }}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;