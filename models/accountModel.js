const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const generateToken = require('../utils/generateToken');

const createAccount = (email, name, website, callback) => {
    const id = uuidv4();
    const secretToken = generateToken();
    db.run(`INSERT INTO accounts (id, email, name, secret_token, website) VALUES (?, ?, ?, ?, ?)`,
        [id, email, name, secretToken, website], callback);
};

const getAccountById = (id, callback) => {
    db.get(`SELECT * FROM accounts WHERE id = ?`, [id], callback);
};

const getAllAccounts = (callback) => {
    db.all(`SELECT * FROM accounts`, [], callback);
};

const updateAccount = (id, email, name, website, callback) => {
    db.run(`UPDATE accounts SET email = ?, name = ?, website = ? WHERE id = ?`,
        [email, name, website, id], callback);
};

const deleteAccount = (id, callback) => {
    db.run(`DELETE FROM accounts WHERE id = ?`, [id], callback);
    db.run(`DELETE FROM destinations WHERE account_id = ?`, [id], callback);
};

module.exports = { createAccount, getAccountById, getAllAccounts, updateAccount, deleteAccount };

