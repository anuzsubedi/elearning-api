const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

exports.generateToken = (userId) => {
    return jwt.sign({ user_id: userId }, SECRET_KEY, { expiresIn: '1h' });
};

exports.verifyToken = (token, callback) => {
    jwt.verify(token, SECRET_KEY, callback);
};
