import React from 'react';
import { Navigate , Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;

  return <>{children}</>;
}