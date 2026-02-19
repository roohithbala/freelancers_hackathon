import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Lightbulb, Bookmark } from 'lucide-react';
import Button from './ui/Button';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">IdeaForge</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/generate"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive('/generate')
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Generate</span>
          </Link>

          <Link
            to="/saved"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive('/saved')
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Ideas</span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4 pl-6 border-l border-gray-300">
              <span className="text-sm text-gray-600">
                Welcome, {user.name}
              </span>
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
