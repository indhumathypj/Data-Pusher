const destinationModel = require('../models/destinationModel');

const createDestination = (req, res) => {
    const { accountId, url, httpMethod, headers } = req.body;
    if (!accountId || !url || !httpMethod || !headers) {
        return res.status(400).json({ message: 'Account ID, URL, HTTP Method, and Headers are required' });
    }

    destinationModel.createDestination(accountId, url, httpMethod, headers, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating destination' });
        }
        res.status(201).json({ message: 'Destination created successfully' });
    });
};

const getDestinations = (req, res) => {
    destinationModel.getAllDestinations((err, destinations) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving destinations' });
        }
        res.status(200).json(destinations);
    });
};

const getDestinationById = (req, res) => {
    const { id } = req.params;
    destinationModel.getDestinationById(id, (err, destination) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving destination' });
        }
        res.status(200).json(destination);
    });
};

const getDestinationsByAccountId = (req, res) => {
    const { accountId } = req.params;
    destinationModel.getDestinationsByAccountId(accountId, (err, destinations) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving destinations' });
        }
        res.status(200).json(destinations);
    });
};

const updateDestination = (req, res) => {
    const { id } = req.params;
    const { url, httpMethod, headers } = req.body;
    if (!url || !httpMethod || !headers) {
        return res.status(400).json({ message: 'URL, HTTP Method, and Headers are required' });
    }

    destinationModel.updateDestination(id, url, httpMethod, headers, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating destination' });
        }
        res.status(200).json({ message: 'Destination updated successfully' });
    });
};

const deleteDestination = (req, res) => {
    const { id } = req.params;
    destinationModel.deleteDestination(id, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting destination' });
        }
        res.status(200).json({ message: 'Destination deleted successfully' });
    });
};

module.exports = { createDestination, getDestinations, getDestinationById, getDestinationsByAccountId, updateDestination, deleteDestination };


