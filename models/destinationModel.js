const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const createDestination = (accountId, url, httpMethod, headers, callback) => {
    const id = uuidv4();
    db.run(`INSERT INTO destinations (id, account_id, url, http_method, headers) VALUES (?, ?, ?, ?, ?)`,
        [id, accountId, url, httpMethod, JSON.stringify(headers)], callback);
};

const getDestinationById = (id, callback) => {
    db.get(`SELECT * FROM destinations WHERE id = ?`, [id], callback);
};

const getAllDestinations = (callback) => {
    db.all(`SELECT * FROM destinations`, [], callback);
};

const getDestinationsByAccountId = (accountId, callback) => {
    db.all(`SELECT * FROM destinations WHERE account_id = ?`, [accountId], callback);
};

const updateDestination = (id, url, httpMethod, headers, callback) => {
    db.run(`UPDATE destinations SET url = ?, http_method = ?, headers = ? WHERE id = ?`,
        [url, httpMethod, JSON.stringify(headers), id], callback);
};

const deleteDestination = (id, callback) => {
    db.run(`DELETE FROM destinations WHERE id = ?`, [id], callback);
};

module.exports = { createDestination, getDestinationById, getAllDestinations, getDestinationsByAccountId, updateDestination, deleteDestination };

