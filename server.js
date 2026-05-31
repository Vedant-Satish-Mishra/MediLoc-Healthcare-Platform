// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth'); // Import auth routes
const medicinesRoutes = require('./routes/medicines'); // Import medicines routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the authentication routes for any requests to '/api/auth'
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicinesRoutes);


// Root route to serve the login page by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});