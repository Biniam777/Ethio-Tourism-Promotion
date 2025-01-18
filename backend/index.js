// Load environment variables
require('dotenv').config();

// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const eventRoutes = require('./routes/EventRoutes');
const historicalEventRoutes = require('./routes/HistoricalEventRoutes');
const culturalEventRoutes = require('./routes/CulturalEventRoutes');
const discoverETRoutes = require('./routes/DiscoverETRoutes');
const adminRoutes = require('./routes/AdminRoutes'); // Declare adminRoutes once
const newsEmailRoutes = require('./routes/NewsEmailRoutes');
const destinationRoutes = require('./routes/DestinationRoutes');
const blogPostRoutes = require('./routes/BlogPostRoutes');
const tripPlanRoutes = require('./routes/TripPlanRoutes');
const blogManagerRoutes = require('./routes/BlogManagerRoutes');
const accountRoutes = require('./routes/AccountRoutes');
const userRoutes = require('./routes/UserRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');

// Initialize the app
const app = express();

// Use environment variable for PORT or default to 5000
const PORT = process.env.PORT || 5000;

// Get MongoDB connection URI from .env file
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 50000, // Timeout for connection
})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if connection fails
  });

// Define a test route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Use routes
app.use('/api/events', eventRoutes);
app.use('/api/historicalEvents', historicalEventRoutes);
app.use('/api/culturalEvents', culturalEventRoutes);
app.use('/api/discoverET', discoverETRoutes);
app.use('/api/newsEmails', newsEmailRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/blogPosts', blogPostRoutes);
app.use('/api/tripPlans', tripPlanRoutes);
app.use('/api/blogManagers', blogManagerRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes); // Correctly include adminRoutes
app.use('/api/feedbacks', feedbackRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
