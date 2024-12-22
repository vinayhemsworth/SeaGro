import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, X, Home, Users, Briefcase, BookOpen, Bike, 
  MessageSquare, ChevronDown, Newspaper, Share, 
  CheckSquare, Users2, LogOut, Settings, User
} from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowProfileMenu(false);
  };

  const navItems = [
    { icon: Home, label: 'Home', to: '/' },
    { icon: Briefcase, label: 'Jobs', to: '/jobs' },
    { icon: BookOpen, label: 'Learning', to: '/learning' },
    { icon: Bike, label: 'Bikes', to: '/bikes' },
    { icon: MessageSquare, label: 'Chat', to: '/chat' },
  ];

  const communityItems = [
    { icon: Users2, label: 'Social Network', to: '/community' },
    { icon: Newspaper, label: 'Tech News', to: '/news' },
    { icon: Share, label: 'Content Sharing', to: '/sharing' },
    { icon: CheckSquare, label: 'To-do Lists', to: '/todos' },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              SeaGro
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-4 h-4 mr-1.5" />
                  {item.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Users2 className="w-4 h-4 mr-1.5" />
                  Community
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                    {communityItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowDropdown(false)}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Profile Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
              >
                Sign Up
              </Link>
            </div>
          )}

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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <div className="text-sm font-medium text-gray-700 mb-2">Community</div>
              {communityItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}