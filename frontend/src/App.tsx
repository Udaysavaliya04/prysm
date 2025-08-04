import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import MasterKeySetup from './components/MasterKeySetup';
import MasterKeyLogin from './components/MasterKeyLogin';
import HomePage from './components/HomePage';
import { Password, PasswordFormData } from './types';
import { API_BASE_URL } from './config/api';

function App(): JSX.Element {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [masterKey, setMasterKey] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingPassword, setEditingPassword] = useState<Password | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'setup' | 'login' | 'manager'>('home');
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  // Scroll to top function
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll events for scroll-to-top button
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    scrollToTop();
  }, [currentView]);

  // Scroll to top when form opens/closes
  useEffect(() => {
    if (showForm) {
      scrollToTop();
    }
  }, [showForm]);

  const fetchPasswords = useCallback(async (): Promise<void> => {
    if (!masterKey) return;
    
    setLoading(true);
    try {
      const response = await axios.get<Password[]>(`${API_BASE_URL}/passwords?masterKey=${encodeURIComponent(masterKey)}`);
      setPasswords(response.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
      alert('Error fetching passwords. Please check your master key.');
    } finally {
      setLoading(false);
    }
  }, [masterKey]);

  const addPassword = async (passwordData: PasswordFormData): Promise<void> => {
    try {
      const response = await axios.post<Password>(`${API_BASE_URL}/passwords`, {
        ...passwordData,
        masterKey
      });
      setPasswords([response.data, ...passwords]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding password:', error);
      alert('Error adding password. Please try again.');
    }
  };

  const updatePassword = async (id: string, passwordData: PasswordFormData): Promise<void> => {
    try {
      const response = await axios.put<Password>(`${API_BASE_URL}/passwords/${id}`, {
        ...passwordData,
        masterKey
      });
      setPasswords(passwords.map(pwd => pwd._id === id ? response.data : pwd));
      setEditingPassword(null);
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    }
  };

  const deletePassword = async (id: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this password?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/passwords/${id}`, {
        data: { masterKey }
      });
      setPasswords(passwords.filter(pwd => pwd._id !== id));
    } catch (error) {
      console.error('Error deleting password:', error);
      alert('Error deleting password. Please try again.');
    }
  };

  const handleEdit = (password: Password): void => {
    setEditingPassword(password);
    setShowForm(true);
  };

  const handleFormClose = (): void => {
    setShowForm(false);
    setEditingPassword(null);
  };

  const handleSignUp = (): void => {
    setCurrentView('setup');
    scrollToTop();
  };

  const handleLogin = (): void => {
    setCurrentView('login');
    scrollToTop();
  };

  const handleMasterKeySet = (key: string): void => {
    setMasterKey(key);
    setCurrentView('manager');
    scrollToTop();
  };

  const handleLogout = (): void => {
    setCurrentView('home');
    setMasterKey('');
    setPasswords([]);
    scrollToTop();
  };

  const filteredPasswords: Password[] = passwords.filter(password =>
    password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (password.url && password.url.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (masterKey && currentView === 'manager') {
      fetchPasswords();
    }
  }, [masterKey, currentView, fetchPasswords]);

  // Homepage view
  if (currentView === 'home') {
    return (
      <div className="page-container">
        <HomePage onLogin={handleLogin} onSignUp={handleSignUp} />
        {/* Scroll to Top Button */}
        <button 
          className={`scroll-to-top ${showScrollToTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      </div>
    );
  }

  // Setup or Login view
  if (currentView === 'setup' || currentView === 'login') {
    return (
      <div className="page-container">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-logo">
              <img src="/prysm-logo.png" alt="Prysm Logo" style={{ height: '47px', width: 'auto', marginRight: '12px' }} />
            </div>
            <div className="nav-links">
              <button onClick={handleLogout} className="nav-link" >← Back to Home</button>
            </div>
          </div>
        </nav>
        <div className="container" style={{ paddingTop: '110px' }}>
        
          {currentView === 'setup' && <MasterKeySetup onMasterKeySet={handleMasterKeySet} />}
          {currentView === 'login' && <MasterKeyLogin onMasterKeySet={handleMasterKeySet} />}
        </div>
        
        {/* Scroll to Top Button */}
        <button 
          className={`scroll-to-top ${showScrollToTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      </div>
    );
  }

  // main password manager view
  return (
    <div className="page-container">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img
              src="/prysm-logo.png"
              alt="Prysm Logo"
              style={{ height: "47px", width: "auto", marginRight: "12px" }}
            />
          </div>
          <div className="nav-links">
            <button
              onClick={handleLogout}
              className="hero-btn hero-btn-primary"
              style={{ marginLeft: "auto", backgroundColor: 'red' , color: 'white', borderColor: 'red',background: 'linear-gradient(135deg, #ff7f7f 0%, #ff4d4d 100%)' , boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)' }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: "110px" }}>
        <div className="card">
          <div className="master-key-section">
            <h3
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #e8eaed 25%, #dadce0 50%, #adb5bd 75%, #868e96 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  display: "inline-block",
                  marginRight: "8px",
                  verticalAlign: "middle",
                }}
              >
                <path d="M15 7h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"></path>
                <path d="M10 12h4"></path>
                <path d="M10 16h4"></path>
                <path d="M10 8h4"></path>
                <path d="M7 7v10"></path>
              </svg>
              Master Key
            </h3>
            <div
              className="master-key-display"
              style={{
                padding: "12px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(233,236,239,0.02) 25%, rgba(222,226,230,0.01) 50%, rgba(173,181,189,0.02) 75%, rgba(134,142,150,0.03) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontFamily: "monospace",
                fontSize: "14px",
                color: "var(--text-primary)",
                wordBreak: "break-all",
                minHeight: "20px",
              }}
            >
              {masterKey}
            </div>
            <p
              style={{ marginTop: "10px", fontSize: "14px", color: "#856404" }}
            >
              Keep this key safe! You'll need it to access your passwords.
            </p>
          </div>

          <button className="add-btn" onClick={() => setShowForm(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Password
          </button>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search passwords..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          {loading ? (
            <div className="loading">
              <div></div>
            </div>
          ) : (
            <PasswordList
              passwords={filteredPasswords}
              onEdit={handleEdit}
              onDelete={deletePassword}
              masterKey={masterKey}
            />
          )}
        </div>

        {showForm &&
          (editingPassword ? (
            <PasswordForm
              password={editingPassword}
              passwords={passwords}
              onSubmit={updatePassword}
              onClose={handleFormClose}
            />
          ) : (
            <PasswordForm
              password={null}
              passwords={passwords}
              onSubmit={addPassword}
              onClose={handleFormClose}
            />
          ))}
      </div>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}

export default App; 