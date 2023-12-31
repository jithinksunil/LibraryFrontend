import React from 'react';
import useAuth from './authContext/useAuth';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const { auth } = useAuth();
  return auth.accessToken ? children : <Navigate to='/login' replace />;
}

export default RequireAuth;
