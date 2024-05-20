const express = require('express');
const multer = require('multer');
const router = express.Router();
const addUsers = require('../Controllers/userControllers');

const upload = multer({ dest: 'uploads/' });

router.post('/:listId', upload.single('file'), addUsers);

module.exports = router;
