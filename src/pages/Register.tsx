import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;