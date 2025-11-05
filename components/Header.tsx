
import React from 'react';

interface HeaderProps {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onSetView: (view: 'public' | 'admin') => void;
  currentView: 'public' | 'admin';
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onLogin, onLogout, onSetView, currentView }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7.5a.5.5 0 01-.5.5H5.5a.5.5 0 01-.5-.5V5z" />
            <path d="M5 5h10v2H5V5zm0 4h10v2H5V9z" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            AI Food Banners
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={() => onSetView('public')} 
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentView === 'public' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
            Public View
          </button>
          {isAdmin && (
            <button 
              onClick={() => onSetView('admin')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentView === 'admin' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              Admin Panel
            </button>
          )}
          {isAdmin ? (
            <button onClick={onLogout} className="px-3 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition-colors">
              Logout
            </button>
          ) : (
            <button onClick={onLogin} className="px-3 py-2 text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 transition-colors">
              Admin Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
