const db = require('../config/db');

exports.findByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], callback);
};

exports.createUser = (userData, callback) => {
    const sql = `INSERT INTO users (full_name, user_type, email, password, created_at) VALUES (?, ?, ?, ?, NOW())`;
    db.query(sql, userData, callback);
};
