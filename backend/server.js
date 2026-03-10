/**
 * Main server file for Sarang-Pulse Backend
 * Configured for deployment on Render
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// =====================
// PORT CONFIGURATION
// =====================
const PORT = process.env.PORT || 5000;

// =====================
// CORS CONFIGURATION
// =====================
// Use environment variable for frontend URL, fallback to localhost for development
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3001';

const corsOptions = {
  origin: [
    frontendURL,
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// =====================
// MIDDLEWARE
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// MONGODB CONNECTION
// =====================
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error('MongoDB URI not defined. Please set MONGODB_URI environment variable.');
    process.exit(1);
  }
  
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // These options ensure stability with MongoDB Atlas
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// =====================
// API ROUTES
// =====================
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/employees', require('./routes/employees'));

// =====================
// HEALTH CHECK ROUTE
// =====================
app.get('/api/health', (req, res) => {
  res status: 'ok', 
    timestamp: new Date().toISOString(),
    mongodb:.json({ 
    mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// =====================
// STATIC FILES (Optional: Serve frontend from backend)
// =====================
// Uncomment if you want to serve the built frontend from the backend
// const frontendBuildPath = path.join(__dirname, '../frontend/build');
// app.use(express.static(frontendBuildPath));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendBuildPath, 'index.html'));
// });

// =====================
// DEFAULT ROUTE
// =====================
app.get('/', (req, res) => {
  res.json({ 
    message: 'Sarang-Pulse Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      dashboard: '/api/dashboard',
      tasks: '/api/tasks',
      employees: '/api/employees'
    }
  });
});

// =====================
// ERROR HANDLING MIDDLEWARE
// =====================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// =====================
// START SERVER
// =====================
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
});
