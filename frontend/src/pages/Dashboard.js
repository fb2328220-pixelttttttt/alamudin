import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-card">
        {/* Header */}
        <div className="dash-header">
          <div className="allah-small">الله</div>
          <h1 className="dash-title">ሼህ አለሙዲን የአርዳታ ድርጅት</h1>
        </div>

        {/* Welcome */}
        <div className="dash-welcome">
          <div className="dash-avatar" aria-label="User avatar">
            {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="dash-info">
            <p className="dash-greeting">እንኳን ደህና መጡ!</p>
            <h2 className="dash-name">{user?.fullName}</h2>
          </div>
        </div>

        {/* User details */}
        <div className="dash-details">
          <div className="detail-row">
            <span className="detail-label">ሙሉ ስም</span>
            <span className="detail-value">{user?.fullName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">አድራሻ</span>
            <span className="detail-value">{user?.address}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">የፋይዳ ቁጥር</span>
            <span className="detail-value">{user?.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">ሚና</span>
            <span className="detail-value detail-role">{user?.role}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          ውጣ
        </button>

        <p className="dash-footer">© ሼህ አለሙዲን ድርጅት - Charitable Foundation</p>
      </div>
    </div>
  );
};

export default Dashboard;
