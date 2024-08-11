// src/routes/routes.tsx
import React, {useContext} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import UploadCSV from '../pages/UploadCSV';
import ViewData from '../pages/ViewData';
import HistoryLead from '../pages/HistoryLead';
import EditLead from '../pages/EditLead';
import CreateLead from '../pages/CreateLead';
import Home from '../pages/Home';
import { context } from '../context/AuthPrivateContext'; 
import Loading from '../components/loading';

const CustomRoute = ({ isPrivate, children }) => {
    
  const { authenticated, loading } = useContext(context);

  if(loading){
      return <Loading/>
  }


  if (isPrivate && !authenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};


const AppRoutes = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<CustomRoute isPrivate><Home /></CustomRoute>} />
      <Route path="/upload-csv" element={<CustomRoute isPrivate><UploadCSV /></CustomRoute>} />
      <Route path="/view-data" element={<CustomRoute isPrivate><ViewData /></CustomRoute>} />
      <Route path="/history-lead" element={<CustomRoute isPrivate><HistoryLead /></CustomRoute>} />
      <Route path="/create-lead" element={<CustomRoute isPrivate><CreateLead /></CustomRoute>} />
      <Route path="/edit-lead/:id" element={<CustomRoute isPrivate><EditLead /></CustomRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
