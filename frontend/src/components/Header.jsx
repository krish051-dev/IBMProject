import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        Server Load Novelty Detection
      </div>

      <div className="header-status">
        <div className="status-dot"></div>
        <span>System Active</span>
      </div>
    </header>
  );
};

export default Header;
