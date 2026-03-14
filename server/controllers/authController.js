const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const registerUser = async (req,res) => {
    try{
        const{ username, email, password } = req.body;
        const userExits = await User.findOne({
            $or: [{email},{username}]
        });

        if (userExits){
            return res.status(400).json({
                message: 'User with this email or username already exists'
            });
        }
        const user = await user.create({
            username,
            email,
            password
        });

        res.status(201).json({
            _id : user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id)
        });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const loginUser = async(req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({
                message: 'Invalid email or password'
            });

        }
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user._id)
            });
        } catch (error){
            res.status(500).json({message: error.message});
       
    }
};

module.exports = { registerUser, loginUser}