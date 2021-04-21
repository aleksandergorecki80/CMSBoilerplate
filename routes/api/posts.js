const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/UserModel');
const Post = require('../../models/PostModel');



// @route   POST api/posts
// @desc    Create a post
// @access  Private

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

// @route   GET api/posts
// @desc    Get all posts
// @access  Public

router.get('/', async (req, res) => {
    try {
        const post = await Post.find().sort({ date: -1 });
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/posts/:id
// @desc    Get single post by ID
// @access  Public

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ msg: 'Post not foun' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not foun' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/posts/:id
// @desc    Remove single post by ID
// @access  private

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorised'})
        }

        await post.remove();
        res.json(`${post.title} has been removed!`)

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  private

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Post already liked'});
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}); 

// @route   POST api/posts/unlike/:id
// @desc    Unlike a post
// @access  private

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}); 

module.exports = router;