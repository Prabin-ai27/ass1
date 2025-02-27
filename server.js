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
app.use(cors());

const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agencies', authenticateToken, agencyRoutes);
app.use('/api/clients', authenticateToken, clientRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));