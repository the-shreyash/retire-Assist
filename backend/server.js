const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pension', require('./routes/pension'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'RetireAssist API is running', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`\n🚀 RetireAssist Backend running on http://localhost:${PORT}`);
    console.log(`📋 API Health: http://localhost:${PORT}/api/health\n`);
});
