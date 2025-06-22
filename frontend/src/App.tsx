import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import MasterKeySetup from './components/MasterKeySetup';
import MasterKeyLogin from './components/MasterKeyLogin';
import HomePage from './components/HomePage';
import { Password, PasswordFormData } from './types';

function App(): JSX.Element {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [masterKey, setMasterKey] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingPassword, setEditingPassword] = useState<Password | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'setup' | 'login' | 'manager'>('home');

  const API_BASE_URL: string = 'http://localhost:5000/api';

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
  };

  const handleLogin = (): void => {
    setCurrentView('login');
  };

  const handleMasterKeySet = (key: string): void => {
    setMasterKey(key);
    setCurrentView('manager');
  };

  const handleLogout = (): void => {
    setCurrentView('home');
    setMasterKey('');
    setPasswords([]);
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
    return <HomePage onLogin={handleLogin} onSignUp={handleSignUp} />;
  }

  // Setup or Login view
  if (currentView === 'setup' || currentView === 'login') {
    return (
      <div>
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
      </div>
    );
  }

  // main password manager view
  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/prysm-logo.png" alt="Prysm Logo" style={{ height: '47px', width: 'auto', marginRight: '12px' }} />
          </div>
          <div className="nav-links">
            <button onClick={handleLogout} className="nav-btn-danger">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '110px' }}>
        
        <div className="card">
          <div className="master-key-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M15 7h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"></path>
                <path d="M10 12h4"></path>
                <path d="M10 16h4"></path>
                <path d="M10 8h4"></path>
                <path d="M7 7v10"></path>
              </svg>
              Master Key
            </h3>
            <input
              type="password"
              value={masterKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMasterKey(e.target.value)}
              placeholder="Enter your master key"
              className="master-key-input"
            />
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#856404' }}>
              Keep this key safe! You'll need it to access your passwords.
            </p>
          </div>

          <button className="add-btn" onClick={() => setShowForm(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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

        {showForm && (
          editingPassword ? (
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
          )
        )}
      </div>
    </div>
  );
}

export default App; 