import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { PasswordFormProps, PasswordFormData,} from '../types';

const PasswordForm: React.FC<PasswordFormProps> = ({ password, passwords, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<PasswordFormData>({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: { suggestions: [] as string[], warning: '' } });
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (password) {
      setFormData({
        title: password.title || '',
        username: password.username || '',
        password: password.password || '',
        url: password.url || '',
        notes: password.notes || ''
      });
      if (password.password) {
        const strength = zxcvbn(password.password);
        setPasswordStrength({ score: strength.score, feedback: strength.feedback });
      }
    }
  }, [password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'password') {
        const strength = zxcvbn(value);
        setPasswordStrength({ score: strength.score, feedback: strength.feedback });

        const duplicate = passwords.some(
            (p) => p.password === value && p._id !== password?._id
        );
        setIsDuplicate(duplicate);
    }
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = 'Title is required.';
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak. Please choose a stronger one.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    
    if (password) {
      onSubmit(password._id, formData);
    } else {
      onSubmit(formData);
    }
  };

  const generatePassword = (): void => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allChars = upper + lower + numbers + symbols;
    const length = 16;

    let generatedPassword = '';
    generatedPassword += upper.charAt(Math.floor(Math.random() * upper.length));
    generatedPassword += lower.charAt(Math.floor(Math.random() * lower.length));
    generatedPassword += numbers.charAt(Math.floor(Math.random() * numbers.length));
    generatedPassword += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 4; i < length; i++) {
      generatedPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    const shuffledPassword = generatedPassword.split('').sort(() => 0.5 - Math.random()).join('');

    setFormData(prev => ({
      ...prev,
      password: shuffledPassword
    }));

    const strength = zxcvbn(shuffledPassword);
    setPasswordStrength({ score: strength.score, feedback: strength.feedback });

    const duplicate = passwords.some(
      (p) => p.password === shuffledPassword && p._id !== password?._id
    );
    setIsDuplicate(duplicate);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {password ? " Edit Password" : " Add New Password"}
          </h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Gmail, Facebook"
              />
              {errors.title && <p className="error-message">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="username">Username/Email *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username or email"
              />
              {errors.username && (
                <p className="error-message">{errors.username}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="password-visibility-toggle"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength-meter">
                    <div
                      className={`strength-bar strength-${passwordStrength.score}`}
                    />
                  </div>
                )}
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
                {isDuplicate && (
                  <p className="error-message">
                    This password is used for another account.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={generatePassword}
                className="hero-btn hero-btn-primary"
                style={{
                  whiteSpace: "nowrap",
                  backgroundColor: "var(--accent-primary)",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Generate
              </button>
            </div>
            <div className="password-feedback-container">
              {formData.password && (
                <div className="password-feedback">
                  {passwordStrength.feedback.warning && (
                    <p className="warning">
                      {passwordStrength.feedback.warning}
                    </p>
                  )}
                  {passwordStrength.feedback.suggestions.map(
                    (suggestion, index) => (
                      <p key={index} className="suggestion">
                        {suggestion}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="url">Website URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes or reminders"
              rows={3}
            />
          </div>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="hero-btn hero-btn-primary">
              {password ? "Update Password" : "Add Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm; 