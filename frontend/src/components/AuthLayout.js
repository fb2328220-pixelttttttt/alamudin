import React from 'react';
import './AuthLayout.css';

const AllahEmblem = ({ className }) => (
  <div className={`allah-emblem-glow ${className}`}>
    <div className="allah-emblem-outer">
      <div className="allah-emblem-inner">
        <span>الله</span>
      </div>
    </div>
  </div>
);

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-bg">
      {/* Glowing Allah emblem — LEFT (top on mobile) */}
      <AllahEmblem className="allah-left" />

      {/* Main card */}
      <div className="auth-card">
        {children}
      </div>

      {/* Glowing Allah emblem — RIGHT (bottom on mobile) */}
      <AllahEmblem className="allah-right" />

      {/* Footer */}
      <div className="page-footer">
        © ሼህ አለሙዲን ድርጅት - Charitable Foundation
      </div>
    </div>
  );
};

export default AuthLayout;
