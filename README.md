# Prysm - Secure Password Manager

A modern, secure password manager built with the MERN stack, featuring military-grade encryption and a beautiful dark-themed interface.

## Features

### Core Functionality
- **Secure Password Storage**: AES-256-CBC encryption for all passwords
- **Master Key Authentication**: Single master key to access all passwords
- **Password Management**: Create, read, update, and delete passwords
- **Smart Search**: Search passwords by title, username, or URL
- **Password Generator**: Generate strong, random passwords
- **Copy to Clipboard**: One-click copying of usernames, passwords, and URLs

### User Interface
- **Modern Design**: Dark-themed interface with gradient text effects
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Glass Effect Cards**: Modern frosted glass design with backdrop blur
- **Scroll Animations**: Smooth animations when scrolling through content
- **Password Visibility Toggle**: Show/hide passwords with eye icon

### Security
- **Client-Side Encryption**: Passwords encrypted in browser before transmission
- **No Server Storage**: Master key never stored on server
- **Secure Transmission**: All data encrypted during API calls
- **Input Validation**: Comprehensive validation on both client and server

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **CSS3** - Custom styling with modern features (gradients, backdrop-filter)
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling for Node.js
- **Crypto** - Built-in Node.js encryption module

## Project Structure

```
prysm/
├── backend/
│   ├── env.config              # Environment configuration
│   ├── server.js              # Express server setup
│   ├── package.json           # Backend dependencies
│   └── node_modules/          # Backend dependencies
├── frontend/
│   ├── public/
│   │   ├── index.html         # Main HTML file
│   │   ├── prysm-logo.ico     # Favicon
│   │   ├── prysm-logo.png     # Logo image
│   │   └── key.svg            # Key icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.tsx           # Landing page component
│   │   │   ├── MasterKeySetup.tsx     # Master key setup form
│   │   │   ├── MasterKeyLogin.tsx     # Master key login form
│   │   │   ├── MasterKeyInput.tsx     # Master key input component
│   │   │   ├── PasswordForm.tsx       # Password creation/editing form
│   │   │   └── PasswordList.tsx       # Password display component
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript type definitions
│   │   ├── App.tsx            # Main application component
│   │   ├── index.tsx          # React application entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   └── tsconfig.json         # TypeScript configuration
└── README.md                 # Project documentation
```

## Security Features

### Encryption
- **Algorithm**: AES-256-CBC encryption
- **Key Derivation**: Master key used as encryption key
- **Client-Side**: All encryption/decryption happens in the browser
- **Zero Knowledge**: Server never sees unencrypted passwords

### Data Protection
- **Master Key**: Never stored on server, only hash for verification
- **Passwords**: Encrypted before database storage
- **Transmission**: Encrypted data sent over HTTPS
- **Validation**: Input sanitization and validation on all endpoints

### Best Practices
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Comprehensive error handling without data leakage
- **Input Validation**: Server-side validation for all user inputs
- **Session Management**: Stateless authentication with master key

**Made with passion for security and modern web development**
