const mongoose = require('mongoose');
const { check } = require('express-validator');

const UserShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('user', UserShema);

const validateUser = [
        check('name', 'Name is required').not().isEmpty().trim(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
    ];

module.exports = { User, validateUser };