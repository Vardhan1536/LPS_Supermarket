import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Logout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get `user` state from AuthContext

  useEffect(() => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">You have been logged out</h2>
        <button onClick={handleLogout} className="btn-secondary">
          Go to Login
        </button>
      </div>
    </div>
  );
}
