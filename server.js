const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes'); // Added course routes
const validationRoutes = require('./routes/validationRoutes');
const imageRoutes = require('./routes/imageRoutes');
const initializeTables = require('./config/initTables');
const chapterRoutes = require('./routes/chapterRoutes');

require('dotenv').config();

// Initialize database tables
initializeTables();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Configure and Restrict CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173", // Use environment variable or default to localhost
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
        credentials: true, // Allow cookies and credentials
    })
);

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes); // Added course routes
app.use('/validate', validationRoutes);
app.use('/image', imageRoutes);
app.use('/chapters', chapterRoutes);

// Default Route (Optional for basic health check)
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
