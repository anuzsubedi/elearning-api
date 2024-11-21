const jwt = require('../utils/jwtUtils');

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: 'Unauthorized' });
    jwt.verifyToken(token, (err, user) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    });
};
