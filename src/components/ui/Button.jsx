import React from 'react';

export function Button({ 
  variant = 'primary', 
  icon: Icon, 
  children, 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105';
  
  const variants = {
    primary: 'bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 shadow-md hover:shadow-lg',
    outline: 'border-2 border-white text-white hover:bg-white/10'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}