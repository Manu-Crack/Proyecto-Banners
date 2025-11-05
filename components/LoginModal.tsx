import React, { useState } from 'react';

interface LoginModalProps {
  onLoginAttempt: (user: string, pass: string) => boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginAttempt, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = onLoginAttempt(username, password);
    if (!success) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label htmlFor="password" text-sm className="block font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="password"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex flex-col space-y-2 pt-2">
            <button 
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};