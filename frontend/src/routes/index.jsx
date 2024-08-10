// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router';

const RoutesIndex = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default RoutesIndex;
