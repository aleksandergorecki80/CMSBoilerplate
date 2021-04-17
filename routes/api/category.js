const express = require('express');
const router = express.Router();

// @route   GET api/category
// @desc    Test route
// @access  Public


router.get('/', (req, res) => {
    res.send('Category rout');
});

module.exports = router;