import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      // Call signup from context to handle the API request and state update
      await signup(email, password, name); // Pass name to the signup method
      
      // Redirect to home page after successful signup
      navigate('/home'); 
    } catch (error) {
      setError('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <ShoppingBag className="h-12 w-12 text-secondary" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        {/* Show error message if signup fails */}
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="name"
                type="text"
                required
                className="input-field rounded-t-md"
                placeholder="Full name"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="input-field rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn-secondary w-full">
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-secondary hover:text-secondary/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
