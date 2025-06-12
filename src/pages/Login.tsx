import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;