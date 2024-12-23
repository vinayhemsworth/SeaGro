import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

export function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 hover:text-teal-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}