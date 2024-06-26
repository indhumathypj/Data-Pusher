const db = require('../models/db.js');

const validateToken = (req, res, next) => {
    const token = req.headers['cl-x-token'];
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Un Authenticate' });
    }

    db.get(`SELECT * FROM accounts WHERE secret_token = ?`, [token], (err, account) => {
        if (err || !account) {
            return res.status(401).json({ message: 'Un Authenticate' });
        }
        req.account = account;
        next();
    });
};

module.exports = validateToken;
