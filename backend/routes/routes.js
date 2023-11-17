const express = require('express');
const { createURL, getURL } = require('../controllers/url');
const router = express.Router();

router.post('/', createURL);
router.get('/:long_url', getURL);

module.exports = router;