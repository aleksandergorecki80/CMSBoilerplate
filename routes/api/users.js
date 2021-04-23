const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const User = require('../../models/UserModel');



// @route   GET api/users
// @desc    Test route
// @access  Public
//      ONLY FOR TEST PURPOSE
router.get('/', async (req, res) => res.send('User route'));


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty().trim(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
         const existingUser = await User.findOne({ email });
         if(existingUser) {
            return res.status(400).json({ errors: [{ msg: 'User already exixts' }]});
         }

         const avatar = gravatar.url(email, {
             s: '200',
             r: 'pg',
             d: 'mm'
         });

         const user = new User({
             name,
             email,
             avatar,
             password
         });

         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);
         await user.save();

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