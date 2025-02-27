require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const agencyRoutes = require('./routes/agencyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agencies', authenticateToken, agencyRoutes);
app.use('/api/clients', authenticateToken, clientRoutes);



// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
