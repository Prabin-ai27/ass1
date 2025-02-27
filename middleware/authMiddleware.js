const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}
module.exports = { authenticateToken };