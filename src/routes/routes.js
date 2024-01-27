const express = require('express');
const { createURL, redirectURL } = require('../controllers/url');
const router = express.Router();

router.post('/generate', createURL);
router.get('/:hashedValue', redirectURL);

module.exports = router;