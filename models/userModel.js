const db = require('../config/db');

// Create `users` table
exports.createUsersTable = (callback) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            user_type VARCHAR(50) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    db.query(sql, callback);
};

// User-related operations
exports.findByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], callback);
};

exports.createUser = (userData, callback) => {
    const sql = `
        INSERT INTO users (full_name, user_type, email, password, created_at) 
        VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(sql, userData, callback);
};
