import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;