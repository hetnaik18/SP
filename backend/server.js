require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3001';
app.use(cors({
origin: [frontendURL, 'http://localhost:3000', 'http://localhost:3001'],
credentials: true
}));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MONGODB
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const connectDB = async () => {
try {
await mongoose.connect(MONGODB_URI);
console.log('MongoDB connected');
} catch (error) {
console.error('DB Error:', error.message);
process.exit(1);
}
};

// API ROUTES
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/employees', require('./routes/employees'));

// FIXED HEALTH CHECK
app.get('/api/health', (req, res) => {
res.json({
status: 'ok',
mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
});
});

// STATIC FILES (Serving Frontend)
const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));

// Wildcard route to handle React Router refreshes
app.get('*', (req, res) => {
res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// START SERVER
connectDB().then(() => {
app.listen(PORT, '0.0.0.0', () => {
console.log(Server running on port ${PORT});
});
})
