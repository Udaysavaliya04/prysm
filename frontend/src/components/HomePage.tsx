import React from 'react';

interface HomePageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogin, onSignUp }) => {
  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none',
        }}>
          <div className="nav-logo">
            <img src="/prysm-logo.png" alt="Prysm Logo" style={{ height: '47px', width: 'auto' }} />
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#security" className="nav-link">Security</a>
            <button onClick={onLogin} className="nav-btn-primary" style={{ background: 'none', border: '1px solid var(--border-color)', cursor: 'pointer' }}>Login</button>
            <button onClick={onSignUp} className="nav-btn-primary">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Password and Access Management for Everyone.</h1>
            <h2 style={{ paddingTop: '11px' }}>Security so good, even you'll forget your password but we won't.</h2>
            <p style={{ paddingTop: '11px' }}>
            </p>
            <div className="hero-buttons">
              <button onClick={onSignUp} className="hero-btn hero-btn-primary">
                Get Started
              </button>
              <button onClick={onLogin} className="hero-btn hero-btn-secondary">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featuress */}
      <section id="features" className="features">
        <div className="container">
          <div className="header">
            <h1>Take back control and secure what matters.</h1>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Military-Grade Encryption</h3>
              <p>
                Your passwords are encrypted using AES-256-CBC encryption before 
                being stored in our secure database. Only you can decrypt them.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                </svg>
              </div>
              <h3>Beautiful Interface</h3>
              <p>
                Modern, dark-themed interface inspired by the best design systems. 
                Clean, intuitive, and a joy to use.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polyline>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>
                Built with React and TypeScript for optimal performance. 
                Instant search, smooth animations, and responsive design.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>Smart Search</h3>
              <p>
                Find your passwords instantly with our powerful search functionality. 
                Search by title, username, or URL.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
              </div>
              <h3>Password Generator</h3>
              <p>
                Generate strong, random passwords with our built-in generator. 
                Never use weak passwords again.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Cross-Platform</h3>
              <p>
                Works perfectly on desktop, tablet, and mobile devices. 
                Your passwords are always accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="features" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="header">
            <h1>Built for Security.</h1>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 7h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"></path>
                  <path d="M10 12h4"></path>
                  <path d="M10 16h4"></path>
                  <path d="M10 8h4"></path>
                  <path d="M7 7v10"></path>
                </svg>
              </div>
              <h3>Master Key Protection</h3>
              <p>
                Your master key is never stored on our servers. Only you know it, 
                and only you can access your passwords.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Client-Side Encryption</h3>
              <p>
                Passwords are encrypted in your browser before being sent to our servers. 
                We never see your plain text passwords.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Secure Storage</h3>
              <p>
                All data is stored in MongoDB Atlas with enterprise-grade security. 
                Multiple layers of protection keep your data safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="hero" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="hero-content">
            <h1>Sleep easy. Prysm's got your back.</h1>
            <p>
              Join thousands of users who trust Prysm with their sensitive data. 
              Get started in seconds, no registration required.
            </p>
            <div className="hero-buttons">
              <button onClick={onSignUp} className="hero-btn hero-btn-primary">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Made with ❤️ + AES-256 by Uday Savaliya.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 