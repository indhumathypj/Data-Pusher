const accountModel = require('../models/accountModel');

const createAccount = (req, res) => {
    const { email, name, website } = req.body;
    if (!email || !name) {
        return res.status(400).json({ message: 'Email and Name are required' });
    }

    accountModel.createAccount(email, name, website, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating account' });
        }
        res.status(201).json({ message: 'Account created successfully' });
    });
};

const getAccounts = (req, res) => {
    accountModel.getAllAccounts((err, accounts) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving accounts' });
        }
        res.status(200).json(accounts);
    });
};

const getAccountById = (req, res) => {
    const { id } = req.params;
    accountModel.getAccountById(id, (err, account) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving account' });
        }
        res.status(200).json(account);
    });
};

const updateAccount = (req, res) => {
    const { id } = req.params;
    const { email, name, website } = req.body;
    if (!email || !name) {
        return res.status(400).json({ message: 'Email and Name are required' });
    }

    accountModel.updateAccount(id, email, name, website, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating account' });
        }
        res.status(200).json({ message: 'Account updated successfully' });
    });
};

const deleteAccount = (req, res) => {
    const { id } = req.params;
    accountModel.deleteAccount(id, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting account' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    });
};

module.exports = { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount };

