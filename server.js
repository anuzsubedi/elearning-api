const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const initializeTables = require('./config/initTables');
const validationRoutes = require('./routes/validationRoutes');

require('dotenv').config();
initializeTables();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Configure and Restrict CORS
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend's URL
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
        credentials: true, // Allow cookies and credentials
    })
);

// Routes
app.use('/auth', authRoutes);
app.use("/validate", validationRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
