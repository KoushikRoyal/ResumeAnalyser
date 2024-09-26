const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const resumeRoutes = require('./routes/resumeRoutes.js');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection   , { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://koushik:koushik@cluster0.ly1mujd.mongodb.net/resumeDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/upload-resume', resumeRoutes);

// Start server
// process.env.PORT ||
const PORT =  3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
