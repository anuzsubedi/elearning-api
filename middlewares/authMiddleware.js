const jwt = require('../utils/jwtUtils');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    try {
        const decoded = jwt.verifyToken(token);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
};
