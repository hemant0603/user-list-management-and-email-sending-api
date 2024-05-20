const express = require('express');
const router = express.Router();
const createList = require('../Controllers/listControllers');

router.post('/', createList);

module.exports = router;
