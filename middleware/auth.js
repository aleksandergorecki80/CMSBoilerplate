const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    // Check if no token
    if(!token){
        return res.status(401).json({ msg: 'Access denied.' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}

module.exports = auth;