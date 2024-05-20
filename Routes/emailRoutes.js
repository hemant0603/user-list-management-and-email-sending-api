const express = require('express');
const router = express.Router();
const { sendEmail, unsubscribeUser } = require('../Controllers/emailController');

router.post('/send/:listId', sendEmail);
router.get('/unsubscribe/:userId', unsubscribeUser);

module.exports = router;