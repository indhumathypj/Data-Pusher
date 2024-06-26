const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.post('/', destinationController.createDestination);
router.get('/', destinationController.getDestinations);
router.get('/:id', destinationController.getDestinationById);
router.get('/account/:accountId', destinationController.getDestinationsByAccountId);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;

