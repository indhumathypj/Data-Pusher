const express = require('express');
const router = express.Router();
const incomingController = require('../controllers/incomingController');
const validateToken = require('../middleware/validateToken');

router.post('/incoming_data', validateToken, incomingController.handleIncomingData);

module.exports = router;
