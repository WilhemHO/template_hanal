// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RealtimeMonitoring from './components/RealtimeMonitoring';
import EventAnomaly from './components/EventAnomaly';
import TrackingPlanHealth from './components/TrackingPlanHealth';
import Setting from './components/Setting';
import './styles.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
           (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
}

function AppLayout({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      {/* Sidebar seulement si pas sur /login */}
      {!isLoginPage && <Sidebar />}
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/realtime-monitoring" element={<RealtimeMonitoring />} />
        <Route path="/event-anomaly" element={<EventAnomaly />} />
        <Route path="/tracking-plan-health" element={<TrackingPlanHealth />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
