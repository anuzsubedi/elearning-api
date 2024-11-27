const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Generate a token
exports.generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

// Verify a token
exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
