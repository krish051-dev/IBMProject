import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Anomalies from './pages/Anomalies';
import Analytics from './pages/Analytics';
import ModelInfo from './pages/ModelInfo';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/anomalies" element={<Anomalies />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/model-info" element={<ModelInfo />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
