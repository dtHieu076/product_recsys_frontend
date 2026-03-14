import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
              ML Commerce
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link 
              to="/" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/') 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/recommended" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/recommended') 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Recommended
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-500 hover:text-gray-900 relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {/* Optional: Add a badge for cart items count here */}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.username}
                </span>
                <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 p-2">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-500 hover:text-gray-900 p-2">
                <UserIcon className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
