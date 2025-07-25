import React, { useState } from 'react';
import axios from 'axios';

interface MasterKeyLoginProps {
  onMasterKeySet: (key: string) => void;
}

const MasterKeyLogin: React.FC<MasterKeyLoginProps> = ({ onMasterKeySet }) => {
  const [masterKey, setMasterKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showMasterKey, setShowMasterKey] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!masterKey) {
      setError('Please enter your master key');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    try {
      const checkResponse = await axios.get(`http://localhost:5000/api/master-key/check?masterKey=${encodeURIComponent(masterKey)}`);
      if (checkResponse.data.isSet) {
        onMasterKeySet(masterKey);
      } else {
        setError('Invalid master key.');
      }
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
    <div className="card" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(233,236,239,0.02) 25%, rgba(222,226,230,0.01) 50%, rgba(173,181,189,0.02) 75%, rgba(134,142,150,0.03) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className="header">
        <h2 style={{ 
          textWrap: 'nowrap',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          letterSpacing: '-0.02em',
          paddingBottom: '10px',
          background: 'linear-gradient(135deg, #ffffff 0%, #e9ecef 20%, #dee2e6 40%, #adb5bd 70%, #868e96 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          <img 
            src="/key.svg" 
            alt="key" 
            style={{ 
              height: '32px', 
              width: 'auto', 
              marginRight: '12px', 
              verticalAlign: 'middle',
              display: 'inline-block'
            }} 
          />
          Enter Your Master Key
        </h2>
        <p style={{ textWrap: 'nowrap',color: 'var(--text-secondary)',opacity: '0.7',fontFamily:" 'fira code', 'Inter'",letterSpacing: '-0.02em',}}>
          Enter your master key to unlock your passwords.
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
              placeholder='Enter your master key'
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
            {isSubmitting ? 'Processing...' : 'Unlock'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MasterKeyLogin; 