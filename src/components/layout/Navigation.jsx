import React from 'react';
import { Menu, X, Home, Users, Briefcase, BookOpen, Bike, MessageSquare } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Users, label: 'Profiles', href: '#profiles' },
    { icon: Briefcase, label: 'Jobs', href: '#jobs' },
    { icon: BookOpen, label: 'Learning', href: '#learning' },
    { icon: Bike, label: 'Bikes', href: '#bikes' },
    { icon: MessageSquare, label: 'Chat', href: '#chat' },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              SeaGro
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-4 h-4 mr-1.5" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}