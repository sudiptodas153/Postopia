import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../page/Loading/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
   const location = useLocation();

  if (loading) {
    return <h2><Loading /></h2>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname}} replace />;
  }

  return children;
};

export default PrivateRoute;
