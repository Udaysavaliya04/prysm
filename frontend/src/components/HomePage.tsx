import React, { useEffect } from 'react';

interface HomePageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogin, onSignUp }) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage-container">
      {/* Nav */}
      <nav className="nav">
        <div className="nav-container homepage-nav-container">
          <div className="nav-logo">
            <img
              src="/prysm-logo.png"
              alt="Prysm Logo"
              className="homepage-header-logo"
            />
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#security" className="nav-link">
              Security
            </a>
            <button onClick={onLogin} className="nav-btn-secondary">
              Log In
            </button>
            <button onClick={onSignUp} className="nav-btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1
              className="animate-on-scroll gradient-text-primary homepage-hero-title"
              style={{ paddingBottom: "5px", letterSpacing: "-0.1em" }}
            >
              Password and Access Management for Everyone.
            </h1>
            <h2
              className="animate-on-scroll delay-1 gradient-text-secondary homepage-hero-subtitle"
              style={{ paddingBottom: "30px", letterSpacing: "-0.05em" }}
            >
              Security so good, even you'll forget your password
              <br></br>But we won't.
            </h2>
            <div className="hero-buttons animate-on-scroll delay-2">
              <button onClick={onSignUp} className="hero-btn hero-btn-primary">
                Get Started
              </button>
              <button onClick={onLogin} className="hero-btn hero-btn-secondary">
                Log In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="container">
          <div className="header">
            <h1
              className="animate-on-scroll gradient-text-primary"
              style={{ paddingBottom: "5px", letterSpacing: "-0.1em" }}
            >
              Take back control and secure what matters.
            </h1>
          </div>

          <div className="features-grid">
            <div className="feature-card animate-on-scroll delay-1">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">
                Military-Grade Encryption
              </h3>
              <p>
                Your passwords are encrypted using AES-256-CBC encryption before
                being stored in our secure database. Only you can decrypt them.
              </p>
            </div>

            <div className="feature-card animate-on-scroll delay-2">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">Beautiful Interface</h3>
              <p>
                Modern, dark-themed interface inspired by the best design
                systems. Clean, intuitive, and a joy to use.
              </p>
            </div>

            <div className="feature-card animate-on-scroll delay-3">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polyline>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">Lightning Fast</h3>
              <p>
                Built with React and TypeScript for optimal performance. Instant
                search, smooth animations, and responsive design.
              </p>
            </div>

            <div className="feature-card animate-on-scroll delay-1">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">Smart Search</h3>
              <p>
                Find your passwords instantly with our powerful search
                functionality. Search by title, username, or URL.
              </p>
            </div>

            <div className="feature-card animate-on-scroll delay-2">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">Password Generator</h3>
              <p>
                Generate strong, random passwords with our built-in generator.
                Never use weak passwords again.
              </p>
            </div>

            <div className="feature-card animate-on-scroll delay-3">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">Cross-Platform</h3>
              <p>
                Works perfectly on desktop, tablet, and mobile devices. Your
                passwords are always accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="features homepage-security-section">
        <div className="container">
          <div className="header">
            <h1
              className="animate-on-scroll gradient-text-primary"
              style={{ paddingBottom: "5px", letterSpacing: "-0.1em" }}
            >
              Built for Security.
            </h1>
          </div>

          <div className="features-grid">
            <div className="feature-card animate-on-scroll delay-1">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 7h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"></path>
                  <path d="M10 12h4"></path>
                  <path d="M10 16h4"></path>
                  <path d="M10 8h4"></path>
                  <path d="M7 7v10"></path>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">Master Key Protection</h3>
              <p>
                Your master key is never stored on our servers. Only you know
                it, and only you can access your passwords.
              </p>
            </div>

            <div className="feature-card animate-on-scroll delay-2">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">
                Client-Side Encryption
              </h3>
              <p>
                Passwords are encrypted in your browser before being sent to our
                servers. We never see your plain text passwords.
              </p>
            </div>

            <div className="feature-card animate-on-scroll delay-3">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="gradient-text-secondary">Secure Storage</h3>
              <p>
                All data is stored in MongoDB Atlas with enterprise-grade
                security. Multiple layers of protection keep your data safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="hero homepage-cta-section">
        <div className="container">
          <div className="hero-content">
            <h1
              className="animate-on-scroll gradient-text-primary"
              style={{ paddingBottom: "5px", letterSpacing: "-0.1em" }}
            >
              Sleep easy. Prysm's got your back.
            </h1>
            <p
              className="animate-on-scroll delay-1"
              style={{
                color: "var(--text-secondary)",
                opacity: "1",
                fontFamily: "'Fira Code', 'Inter'",
                letterSpacing: "-0.05em",
                fontWeight: "500",
              }}
            >
              Join thousands of users who trust Prysm with their sensitive data.
              Get started in seconds, no registration required.
            </p>
            <div className="hero-buttons animate-on-scroll delay-2">
              <button onClick={onSignUp} className="hero-btn hero-btn-primary">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="homepage-footer">
        <div className="container homepage-footer-container">
          <p className="homepage-footer-text">
            Made with ❤️ + AES-256 by Uday Savaliya.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 