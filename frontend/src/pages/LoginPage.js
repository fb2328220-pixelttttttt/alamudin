import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.password) {
      setError('እባክዎ ሁሉንም መስኮች ይሙሉ');
      return;
    }
    try {
      setLoading(true);
      await login(formData.phone, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'ወደ ስርዓቱ መግባት አልተቻለም። እንደገና ይሞክሩ።'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Title */}
      <h1 className="auth-title">ሼህ አለሙዲን የአርዳታ ድርጅት</h1>

      {/* Portrait emblem */}
      <div className="portrait-frame">
        <div className="portrait-inner">
          <img
            src="/sheikh.jpg"
            alt="ሼህ አለሙዲን"
            className="portrait-photo"
          />
        </div>
      </div>

      {/* Error message */}
      {error && <div className="error-banner" role="alert">{error}</div>}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="auth-form" noValidate>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">የንግድ ባንክ አካዉንት ቁጥር</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="form-input"
            placeholder="የንግድ ባንክ አካዉንት ቁጥር"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">የይለፍ ቃል</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="የይለፍ ቃል"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            aria-required="true"
          />
        </div>

        <div className="forgot-link-row">
          <Link to="/forgot-password" className="forgot-link">
            የይለፍ ቃል ረስትዋል?
          </Link>
        </div>

        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'በመጫን ላይ...' : 'ግባ'}
        </button>

        <div className="switch-auth">
          <Link to="/register" className="switch-link">
            አዲስ መለያ ይፍጠሩ
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
