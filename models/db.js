const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        secret_token TEXT NOT NULL,
        website TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating accounts table:', err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS destinations (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        url TEXT NOT NULL,
        http_method TEXT NOT NULL,
        headers TEXT NOT NULL,
        FOREIGN KEY(account_id) REFERENCES accounts(id)
    )`, (err) => {
        if (err) {
            console.error('Error creating destinations table:', err.message);
        }
    });
});

module.exports = db;
