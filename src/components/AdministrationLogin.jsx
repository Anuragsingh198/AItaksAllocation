import React from 'react';
import { X } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 w-96 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Administrator Login</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please sign in with your administrator Google account to access the management features.
        </p>
        
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={() => console.log('Login Failed')}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
