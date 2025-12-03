import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'env.config') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/password-manager';
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoURI.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Schemas
const passwordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  url: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const userDataSchema = new mongoose.Schema({
  masterKeyHash: { type: String, required: true, unique: true },
  passwords: [passwordSchema]
});

const UserData = mongoose.model('UserData', userDataSchema);

const validateMasterKey = async (masterKey) => {
  if (!masterKey) {
    throw { status: 400, message: 'Master key is required' };
  }
  const masterKeyHash = crypto.createHash('sha256').update(masterKey).digest('hex');
  const userData = await UserData.findOne({ masterKeyHash });
  if (!userData) {
    throw { status: 401, message: 'Invalid master key' };
  }
  return { userData, masterKeyHash };
};

const encryptPassword = (password, masterKey) => {
  try {
    const key = crypto.createHash('sha256').update(masterKey).digest();
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    throw new Error('Encryption failed: ' + error.message);
  }
};

const decryptPassword = (encryptedPassword, masterKey) => {
  try {
    const key = crypto.createHash('sha256').update(masterKey).digest();
    
    const parts = encryptedPassword.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid encrypted data format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    return 'Decryption failed';
  }
};

// Check if master key is setup
app.get('/api/master-key/is-setup', async (req, res) => {
  try {
    const userCount = await UserData.countDocuments();
    res.json({ isSetup: userCount > 0 });
  } catch (error) {
    res.status(500).json({ error: 'Server error while checking setup status' });
  }
});

// check master key
app.get('/api/master-key/check', async (req, res) => {
  try {
    const { masterKey } = req.query;
    if (!masterKey) {
      return res.status(400).json({ error: 'Master key is required' });
    }

    const masterKeyHash = crypto.createHash('sha256').update(masterKey).digest('hex');
    const userData = await UserData.findOne({ masterKeyHash });
    
    res.json({ isSet: !!userData });
  } catch (error) {
    res.status(500).json({ error: 'Server error while checking master key' });
  }
});

// set master key
app.post('/api/master-key', async (req, res) => {
  try {
    const { masterKey } = req.body;
    if (!masterKey) {
      return res.status(400).json({ error: 'Master key is required' });
    }

    const masterKeyHash = crypto.createHash('sha256').update(masterKey).digest('hex');

    const existingUserData = await UserData.findOne({ masterKeyHash });
    if (existingUserData) {
      return res.status(409).json({ error: 'Master key is already set' });
    }

    const newUser = new UserData({ masterKeyHash, passwords: [] });
    await newUser.save();
    
    res.status(201).json({ message: 'Master key set successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while setting master key' });
  }
});

// Routes
app.get('/api/passwords', async (req, res) => {
  try {
    const { userData } = await validateMasterKey(req.query.masterKey);

    const decryptedPasswords = userData.passwords
      .map(p => ({ ...p.toObject(), password: decryptPassword(p.password, req.query.masterKey) }))
      .sort((a, b) => b.createdAt - a.createdAt);

    res.json(decryptedPasswords);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

app.post('/api/passwords', async (req, res) => {
  try {
    const { title, username, password, url, notes, masterKey } = req.body;
    const { userData } = await validateMasterKey(masterKey);

    const newPassword = {
      title,
      username,
      password: encryptPassword(password, masterKey),
      url,
      notes
    };
    
    userData.passwords.push(newPassword);
    await userData.save();

    const savedPassword = userData.passwords[userData.passwords.length - 1];
    res.status(201).json({
      ...savedPassword.toObject(),
      password: decryptPassword(savedPassword.password, masterKey)
    });
  } catch (error) {
    console.error('Error in POST /api/passwords:', error);
    res.status(error.status || 500).json({ error: error.message });
  }
});

app.put('/api/passwords/:id', async (req, res) => {
  try {
    const { title, username, password, url, notes, masterKey } = req.body;
    const { userData } = await validateMasterKey(masterKey);

    const passwordToUpdate = userData.passwords.id(req.params.id);
    if (!passwordToUpdate) {
      return res.status(404).json({ error: 'Password not found' });
    }

    Object.assign(passwordToUpdate, { title, username, url, notes, updatedAt: new Date() });
    if (password) passwordToUpdate.password = encryptPassword(password, masterKey);
    
    await userData.save();

    res.json({
      ...passwordToUpdate.toObject(),
      password: password ? 'Password updated' : decryptPassword(passwordToUpdate.password, masterKey)
    });
  } catch (error) {
    console.error('Error in PUT /api/passwords/:id:', error);
    res.status(error.status || 500).json({ error: error.message || 'Server error updating password' });
  }
});

app.delete('/api/passwords/:id', async (req, res) => {
  try {
    const { userData } = await validateMasterKey(req.query.masterKey);

    const passwordIndex = userData.passwords.findIndex(p => p._id.toString() === req.params.id);
    if (passwordIndex === -1) {
      return res.status(404).json({ error: 'Password not found' });
    }

    userData.passwords.splice(passwordIndex, 1);
    await userData.save();
    
    res.json({ message: 'Password deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/passwords/:id:', error);
    res.status(error.status || 500).json({ error: error.message || 'Server error deleting password' });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Prysm Password Manager API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Prysm Password Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      masterKey: '/api/master-key',
      passwords: '/api/passwords'
    }
  });
});

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`)); 
