import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import JobMarketPage from './pages/JobMarketPage';
import SalaryPage from './pages/SalaryPage';
import SkillsPage from './pages/SkillsPage';
import ForecastPage from './pages/ForecastPage';
import ExportPage from './pages/ExportPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('auth_token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
          } />
          <Route path="/" element={
            isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />
          }>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="job-market" element={<JobMarketPage />} />
            <Route path="salary" element={<SalaryPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="forecast" element={<ForecastPage />} />
            <Route path="export" element={<ExportPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
