const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/UserModel');
const Post = require('../../models/PostModel');



// @route   POST api/posts
// @desc    Create a post
// @access  Public

router.post('/', [ auth, [ 
    check('text', 'Text is required').not().isEmpty(),
    check('title', 'Title must be at least 6 character long').isLength({ min: 6, max: 255 })
 ] ] , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.mapped() });
    }

    try {
        const user = await User.findById({ _id: req.user.id }).select({ 'password': 0 });
        const newPost = new Post ({
            user: req.user.id,
            userName: user.name,
            title: req.body.title,
            text: req.body.text,
            avatar: user.avatar
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    
});

module.exports = router;