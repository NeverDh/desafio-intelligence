// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import { AuthPrivateProvider } from '../context/AuthPrivateContext'; 

const RoutesIndex = () => {
  return (
    
    <Router>
      <AuthPrivateProvider>
        <AppRoutes />
        </AuthPrivateProvider>
      </Router>
  
  );
};

export default RoutesIndex;
