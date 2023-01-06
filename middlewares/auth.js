const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    try {
        const username = req.headers.username;
        const token = req.headers.token;
        const decodeToken = jwt.verify(token, process.env.JWT_KEY);
        User.findById(decodeToken.userId)
            .then((user) => {
                if (username === user.username) next();
                else res.status(403).json({message: 'Unauthorized'});
            })
            .catch(() => res.status(403).json({message: 'Unauthorized'}))
    } catch {
        res.status(403).json({message: 'Unauthorized'})
    }
};
