require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('DB Error:', err));

app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/employees', require('./routes/employees'));

app.get('/api/health', (req, res) => {
res.json({ status: 'ok' });
});

const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
console.log('Server is running');
});
