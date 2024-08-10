// src/routes/routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import UploadCSV from '../pages/UploadCSV';
import ViewData from '../pages/ViewData';
import HistoryLead from '../pages/HistoryLead';
import EditLead from '../pages/EditLead';
import CreateLead from '../pages/CreateLead';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload-csv" element={<UploadCSV />} />
      <Route path="/view-data" element={<ViewData />} />
      <Route path="/history-lead" element={<HistoryLead />} />
      <Route path="/create-lead" element={<CreateLead />} />
      <Route path="/edit-lead/:id" element={<EditLead />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
