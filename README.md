# Prysm - Secure Password Manager

A modern, secure password manager built with the MERN stack, featuring military-grade encryption and a beautiful dark-themed interface.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Database Schema](#database-schema)
- [Frontend Components](#frontend-components)
- [Contributing](#contributing)
- [License](#license)

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

### Development Tools
- **Create React App** - React development environment
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher)
- **MongoDB Atlas account** (or local MongoDB installation)
- **Git** (for cloning the repository)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Udaysavaliya04/prysm.git
   cd prysm
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

### Backend Configuration

1. **Create environment configuration**
   ```bash
   cd backend
   cp env.config.example env.config
   ```

2. **Update environment variables**
   Edit `backend/env.config` with your configuration:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/password-manager
   PORT=5000
   ```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:5000`. If you need to change this, update the API base URL in the frontend components.

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve the production build**
   ```bash
   npm install -g serve
   serve -s build -l 3000
   ```

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

## API Endpoints

### Authentication
- `POST /api/master-key` - Set up master key
- `GET /api/master-key/check` - Verify master key

### Password Management
- `GET /api/passwords` - Retrieve all passwords
- `POST /api/passwords` - Create new password
- `PUT /api/passwords/:id` - Update existing password
- `DELETE /api/passwords/:id` - Delete password

### Request/Response Examples

**Create Password**
```javascript
POST /api/passwords
Content-Type: application/json

{
  "title": "Gmail",
  "username": "user@gmail.com",
  "password": "securepassword123",
  "url": "https://gmail.com",
  "notes": "Personal email account",
  "masterKey": "your-master-key"
}
```

**Response**
```javascript
{
  "_id": "64abc123def456789",
  "title": "Gmail",
  "username": "user@gmail.com",
  "password": "encrypted-password-data",
  "url": "https://gmail.com",
  "notes": "Personal email account",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
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

## Database Schema

### Master Key Collection
```javascript
{
  _id: ObjectId,
  hashedMasterKey: String,    // Hashed master key for verification
  salt: String,               // Salt for key hashing
  createdAt: Date,
  updatedAt: Date
}
```

### Passwords Collection
```javascript
{
  _id: ObjectId,
  title: String,              // Password title/name
  username: String,           // Username or email
  password: String,           // Encrypted password
  url: String,                // Website URL (optional)
  notes: String,              // Additional notes (optional)
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Components

### Core Components

**HomePage.tsx**
- Landing page with features showcase
- Gradient text effects and animations
- Navigation to login/signup

**MasterKeySetup.tsx**
- Master key creation form
- Password confirmation
- Security warnings and tips

**MasterKeyLogin.tsx**
- Master key authentication
- Session initialization

**PasswordList.tsx**
- Display all passwords in card format
- Search and filter functionality
- Master key display with visibility toggle

**PasswordForm.tsx**
- Create/edit password form
- Input validation
- Password generator integration

### Styling Features
- **CSS Custom Properties**: For consistent theming
- **Gradient Text**: Modern gradient effects on headings
- **Glass Morphism**: Backdrop blur effects on cards
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Scroll-triggered animations

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add proper error handling
- Include security considerations
- Test all functionality thoroughly

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For support, questions, or contributions, please open an issue on the GitHub repository.

## Acknowledgments

- Built with modern web technologies
- Inspired by security-first design principles
- Focused on user experience and accessibility

---

**Made with passion for security and modern web development**
