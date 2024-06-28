const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchAdmin = (req, res, next) => {
    const UserToken = req.header('auth-token');
   
    if (!UserToken) {
        
        return res.status(401).send('Access Denied: No Token Provided!');
    }
    try {
        const data = jwt.verify(UserToken,process.env.Key); // Corrected order
        
        req.admin = data;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid Token');
    }
};

module.exports = fetchAdmin;
