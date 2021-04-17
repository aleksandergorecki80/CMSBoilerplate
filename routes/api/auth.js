const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User  = require('../../models/UserModel');

// @route   GET api/auth
// @desc    Auth route
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() })
    }

    const { email, password } = req.body;

    try {
         const user = await User.findOne({ email });
         if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Wrong email or password' }]});
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Wrong email or password' }]});
         }

         const payload = {
             user: {
                 id: user.id
             }
         }
         jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                return res.json( { token });
            }
         );
    } catch(err) {
         console.error(err.message);
         return res.status(500).send('Server error');
    }   
});


module.exports = router;