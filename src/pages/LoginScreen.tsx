
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';

const LoginScreen: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Redirect if already logged in
  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-thrive-purple">THRIVE</h1>
            <p className="mt-2 text-gray-500">Your mental wellness companion</p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                Sign in to continue your wellness journey
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} THRIVE. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginScreen;
