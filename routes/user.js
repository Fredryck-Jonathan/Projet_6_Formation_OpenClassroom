const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const email = require('../middleware/email');
const password = require('../middleware/password');
const rateLimit = require('../middleware/rateLimit')

router.post('/signup', email, password, userCtrl.signup);
router.post('/login', rateLimit, email, password, userCtrl.login);

module.exports = router;