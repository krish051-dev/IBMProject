import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, LineChart, BrainCircuit, Server } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Server size={24} color="var(--accent-blue)" />
        <span>Load Novelty</span>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/anomalies" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <AlertTriangle size={20} />
          <span>Anomalies</span>
        </NavLink>
        
        <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LineChart size={20} />
          <span>Analytics</span>
        </NavLink>
        
        <NavLink to="/model-info" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BrainCircuit size={20} />
          <span>Model Info</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
