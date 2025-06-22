import React, { useState } from 'react';
import axios from 'axios';

interface MasterKeySetupProps {
  onMasterKeySet: (key: string) => void;
}

const MasterKeySetup: React.FC<MasterKeySetupProps> = ({ onMasterKeySet }) => {
  const [masterKey, setMasterKey] = useState<string>('');
  const [confirmKey, setConfirmKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showMasterKey, setShowMasterKey] = useState<boolean>(false);
  const [showConfirmKey, setShowConfirmKey] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!masterKey) {
      setError('Please enter a master key');
      return;
    }

    if (masterKey.length < 8) {
      setError('Master key must be at least 8 characters long');
      return;
    }
    
    if (masterKey !== confirmKey) {
      setError('Master keys do not match');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:5000/api/master-key', { masterKey });
      onMasterKeySet(masterKey);
    } catch (apiError) {
      if (axios.isAxiosError(apiError) && apiError.response) {
        setError(apiError.response.data.error || 'An unknown error occurred');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="header">
        <h2 style={{ textWrap: 'nowrap',fontSize: '2.5rem',fontWeight: 'bold',letterSpacing: '-0.02em',paddingBottom: '10px'}}>
          <svg 
            width="26" 
            height="26" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}
          >
            <circle cx="8" cy="15" r="4" />
            <line x1="10.85" y1="12.15" x2="19" y2="4" />
            <line x1="18" y1="5" x2="20" y2="7" />
            <line x1="15" y1="8" x2="17" y2="10" />
          </svg>
          Set Your Master Key
        </h2>
        <p style={{ textWrap: 'nowrap',color: 'var(--text-secondary)',opacity: '0.7',fontFamily:" 'fira code', 'Inter'",letterSpacing: '-0.02em',}}>
          This key will encrypt and decrypt all your passwords. Keep it safe!
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="masterKey">Master Key *</label>
          <div className="password-input-container">
            <input
              type={showMasterKey ? "text" : "password"}
              id="masterKey"
              value={masterKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMasterKey(e.target.value)}
              placeholder='Enter your master key (min 8 characters)'
              required
            />
            <button
              type="button"
              onClick={() => setShowMasterKey(prev => !prev)}
              className="password-visibility-toggle"
              title={showMasterKey ? "Hide password" : "Show password"}
            >
              {showMasterKey ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmKey">Confirm Master Key *</label>
          <div className="password-input-container">
            <input
              type={showConfirmKey ? "text" : "password"}
              id="confirmKey"
              value={confirmKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmKey(e.target.value)}
              placeholder="Confirm your master key"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmKey(prev => !prev)}
              className="password-visibility-toggle"
              title={showConfirmKey ? "Hide password" : "Show password"}
            >
              {showConfirmKey ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div style={{ 
            color: 'var(--accent-danger)', 
            marginBottom: '20px', 
            padding: '12px', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            borderRadius: '12px' 
          }}>
            {error}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Set Master Key & Continue'}
          </button>
        </div>
      </form>
      
      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        background: 'rgba(245, 158, 11, 0.1)', 
        border: '1px solid rgba(245, 158, 11, 0.3)', 
        borderRadius: '12px' 
      }}>
        <h4 style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-warning)', marginBottom: '8px' }}>
          <svg 
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ marginRight: '8px' }}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          Important Security Note
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)' ,fontFamily:" 'fira code', 'Inter'",letterSpacing: '-0.01em',}}>
          <li>Your master key is never stored on our servers</li>
          <li>If you forget it, you cannot recover your passwords</li>
          <li>Use a strong, memorable password</li>
          <li>Consider using a password manager to store this key</li>
        </ul>
      </div>
    </div>
  );
};

export default MasterKeySetup; 