const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if(existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);
        res.status(201).json({id:newUser.id, email:newUser.email});
    }catch(err) {
        res.status(500).json({message:err.message});'
    }
};

const login = async (req, res) => {
    const {email,password} = req.body;

    try{
        const user = await findUserByEmail(email);
        if(!user) return res.status(400).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({ id:user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({token});

    }catch(err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    register,
    login
};