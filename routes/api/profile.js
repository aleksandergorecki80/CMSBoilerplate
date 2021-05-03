const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/ProfileModel');
const User = require('../../models/UserModel');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get curent user profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );
  if (!profile) {
    return res.status(400).json({ msg: 'No profile found' });
  }

  res.json(profile);
  try {
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Private

router.post(
  '/',
  [auth, [check('status', 'Status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    // Build profile object
    const profileFilds = {
      user: req.user.id,
      status: req.body.status,
    };
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        profile = await Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFilds },
          { new: true }
        );
        return res.json(profile);
      }
      // Create
      profile = new Profile(profileFilds);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
    res.send(profileFilds);
  }
);

module.exports = router;
