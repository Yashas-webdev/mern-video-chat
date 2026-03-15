const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            return res.status(400).json({
                message: 'User with this email or username already exists'
            });
        }

        const newUser = await User.create({
            username,
            email,
            password
        });

        console.log('newUser created:', newUser._id);

        try {
    const token = generateToken(newUser._id);
    console.log('token generated:', token);
    
    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        token: token
    });
} catch(tokenError) {
    console.log('TOKEN ERROR:', tokenError.message);
    res.status(500).json({ message: tokenError.message });
}
        console.log('newUser username:', newUser.username);
        console.log('newUser email:', newUser.email);


        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar,
            token: generateToken(newUser._id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
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

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };