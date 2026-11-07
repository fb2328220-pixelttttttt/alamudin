import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import './AuthPages.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, phone, password, confirmPassword } = formData;

    if (!fullName || !address || !phone || !password || !confirmPassword) {
      setError('እባክዎ ሁሉንም መስኮች ይሙሉ');
      return;
    }
    if (password !== confirmPassword) {
      setError('የይለፍ ቃሎቹ አይዛመዱም');
      return;
    }
    if (password.length < 6) {
      setError('የይለፍ ቃል ቢያንስ 6 ፊደሎች ሊኖሩት ይገባል');
      return;
    }

    try {
      setLoading(true);
      await register(fullName, address, phone, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'ምዝገባ አልተቻለም። እንደገና ይሞክሩ።'
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

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="auth-form" noValidate>

        <div className="form-group">
          <label className="form-label" htmlFor="fullName">ሙሉ ስም</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="form-input"
            placeholder="ሙሉ ስም"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="address">አድራሽ</label>
          <input
            id="address"
            type="text"
            name="address"
            className="form-input"
            placeholder="አድራሽ"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            aria-required="true"
          />
        </div>

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
            autoComplete="new-password"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">የይለፍ ቃል ያረጋግጡ</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className="form-input"
            placeholder="የይለፍ ቃል ያረጋግጡ"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            aria-required="true"
          />
        </div>

        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'በመጫን ላይ...' : 'ምዝገባ'}
        </button>

        <div className="switch-auth">
          <Link to="/login" className="switch-link">
            አስቀድሞ መለያ አለዎት? ግባ
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
