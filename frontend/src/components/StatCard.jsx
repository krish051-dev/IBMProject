import React from 'react';

const StatCard = ({ title, value, unit, icon: Icon, color = 'var(--accent-blue)', trend }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {Icon && <Icon size={20} color={color} />}
      </div>
      
      <div className="text-3xl">
        {value} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{unit}</span>
      </div>
      
      {trend && (
        <div style={{ 
          fontSize: '0.875rem', 
          color: trend.isPositive ? 'var(--accent-red)' : 'var(--accent-green)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginTop: '0.5rem'
        }}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last hour
        </div>
      )}
    </div>
  );
};

export default StatCard;
