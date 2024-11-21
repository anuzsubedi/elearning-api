const db = require('./db');

// SQL Statements to Check and Create Tables
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const initializeTables = () => {
    // Create `users` table if it does not exist
    db.query(createUsersTable, (err, result) => {
        if (err) {
            console.error("Error creating 'users' table:", err.message);
        } else {
            console.log("'users' table is ready.");
        }
    });
};

module.exports = initializeTables;
