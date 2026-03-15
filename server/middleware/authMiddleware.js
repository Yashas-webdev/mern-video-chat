const jwt = require('jsonwebtoken'); //to verify the token sent by the client.
const User = require('../models/User'); //After verifying the token we fetch the actual user from MongoDB and attach it to the request.

const protect = async( req, res, next) => {
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error){
            return res.status(401).json({message: 'Not authorized, token fialed'});
        }
    }

    if(!token){
        return res.status(401).json({message:'Not authorized, no token'});
    }
};

module.exports = {protect}