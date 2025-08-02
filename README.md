# Prysm - Secure Password Manager

A modern, secure password manager built with the MERN stack, featuring military-grade encryption and a beautiful dark-themed interface.

https://github.com/user-attachments/assets/c0973280-f244-44c2-bba9-8371b1885c66

## Features

### Core Functionality
- **Secure Password Storage**: AES-256-CBC encryption for all passwords
- **Master Key Authentication**: Single master key to access all passwords
- **Password Management**: Create, read, update, and delete passwords
- **Smart Search**: Search passwords by title, username, or URL
- **Password Generator**: Generate strong, random passwords
- **Copy to Clipboard**: One-click copying of usernames, passwords, and URLs

### Security
- **Client-Side Encryption**: Passwords encrypted in browser before transmission
- **No Server Storage**: Master key never stored on server
- **Secure Transmission**: All data encrypted during API calls
- **Input Validation**: Comprehensive validation on both client and server

## Technology Stack

### Frontend
- **React 18** 
- **TypeScript** 
- **CSS3** 
- **Axios**

### Backend
- **Node.js** 
- **Express.js**
- **MongoDB** 
- **Mongoose**
- **Crypto**

## Project Structure

```
prysm/
├── backend/
│   ├── server.js                             
├── frontend/
│   ├── public/
│   │   ├── index.html          
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.tsx          
│   │   │   ├── MasterKeySetup.tsx    
│   │   │   ├── MasterKeyLogin.tsx    
│   │   │   ├── MasterKeyInput.tsx    
│   │   │   ├── PasswordForm.tsx      
│   │   │   └── PasswordList.tsx     
│   │   ├── types/
│   │   │   └── index.ts      
│   │   ├── App.tsx         
│   │   ├── index.tsx         
│   │   └── index.css            
└── README.md               
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

**Made with passion for security and modern web development**
