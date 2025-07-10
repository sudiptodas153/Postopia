import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
