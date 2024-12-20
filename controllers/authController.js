const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwtUtils');
const db = require('../config/db');

exports.signup = (req, res) => {
    const { full_name, user_type, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO users (full_name, user_type, email, password, created_at) VALUES (?, ?, ?, ?, NOW())`;
    db.query(sql, [full_name, user_type, email, hashedPassword], (err) => {
        if (err) {
            console.error("Error during signup:", err.message || err);
            return res.status(500).json({ message: 'Error signing up' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;

    db.query(sql, [email], (err, result) => {
        if (err || result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Include user_id and user_type in the JWT payload
        const token = jwt.generateToken({
            user_id: user.user_id,
            user_type: user.user_type,
        });

        // Set the token in cookies
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                user_type: user.user_type,
            },
        });
    });
};



exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
