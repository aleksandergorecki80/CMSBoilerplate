const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/UserModel');
const Post = require('../../models/PostModel');
const multer = require('multer');

// @route   POST api/posts/upload
// @desc    Upload a photo
// @access  Private

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .jpg and .jpeg format allowed!'));
    }
  },
  limits: { fileSize: 1048576 },
});

const uploadSingleImage = upload.single('postImg');
router.post('/upload', auth, (req, res) => {
  try {
    uploadSingleImage(req, res, (err) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
      if (req.file === null) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      res.status(200).json({
        filename: req.file.filename,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts
// @desc    Create a post
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('title', 'Title must be at least 6 character long').isLength({
        min: 6,
        max: 255,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    try {
      const user = await User.findById({ _id: req.user.id }).select({
        password: 0,
      });
      const newPost = new Post({
        user: req.user.id,
        userName: user.name,
        title: req.body.title,
        text: req.body.text,
        filename: req.body.filename,
        avatar: user.avatar,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

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
    if (!post) {
      return res.status(404).json({ msg: 'Post not foun' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not foun' });
    }
    res.status(500).send('Server error');
  }
});

// @route   EDIT api/posts/edit/:id
// @desc    Edit single post by ID
// @access  private

router.put(
  '/edit/:id',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('title', 'Title must be at least 6 character long').isLength({
        min: 6,
        max: 255,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorised' });
      }

      post.title = req.body.title;
      post.text = req.body.text;
      post.filename = req.body.filename;

      await post.save();
      res.send(post);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/posts/:id
// @desc    Remove single post by ID
// @access  private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    await post.remove();
    res.json(`${post.title} has been removed!`);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Create a comment on a post
// @access  Private

router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('title', 'Title must be at least 6 character long').isLength({
        min: 6,
        max: 255,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    try {
      const user = await User.findById(req.user.id).select({ password: 0 });
      const post = await Post.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        userName: user.name,
        title: req.body.title,
        text: req.body.text,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/posts/comment/edit/:id/:comment_id
// @desc    Edit a comment on post
// @access  Private

router.put('/comment/edit/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out a comment
    const comment = post.comments.find(
      (comment) => req.params.comment_id === comment._id.toString()
    );

    // Make sure comment exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    comment.title = req.body.title;
    comment.text = req.body.text;

    await post.save();

    res.send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove a comment on from post
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out a comment
    const comment = post.comments.find(
      (comment) => req.params.comment_id === comment._id.toString()
    );

    // Make sure comment exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    // Get remove index
    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    );
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
