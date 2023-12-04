var express = require('express');
var app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
require('dotenv').config();


const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const PORT = process.env.PORT || 8089;

const mongoose = require('mongoose');
require('dotenv').config(); // Use dotenv to load the environment variables

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes from the routes directory
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Root route to check if the application is running
app.get("/", (req, res) => {
  res.json({ message: "Application is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
