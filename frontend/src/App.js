import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import TaskPage from './components/TaskPage';
import AnalyticsPage from './components/AnalyticsPage';
import PrivateRoute from './components/PrivateRoute';
import Notification from './components/Notification';

function App() {
  return (
    <Router>
      <Notification />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/tasks" element={<PrivateRoute><TaskPage /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
}

export default App;
