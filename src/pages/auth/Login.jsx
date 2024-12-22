import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';

export function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-600 hover:text-teal-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}