import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;