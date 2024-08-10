// src/routes/routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import UploadCSV from '../pages/UploadCSV';
import ViewData from '../pages/ViewData';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload-csv" element={<UploadCSV />} />
      <Route path="/view-data" element={<ViewData />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
