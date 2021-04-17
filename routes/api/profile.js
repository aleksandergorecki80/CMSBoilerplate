const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/ProfileModel');
const User = require('../../models/UserModel');


// @route   GET api/profile/me
// @desc    Get curent user profile
// @access  Public


router.get('/me', auth, async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if(!profile){
        return res.status(400).json( { msg: 'No profile found'});
    }
    
    res.json(profile);
    try {

    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }

});

module.exports = router;