'use strict';

const db = require('../db/dbmiddleware');

module.exports = {
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.get(query, [email], (err, row) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (!row) reject({ message: "No user found", status: 404 });
                else resolve({ user: row, status: 200 })
            })
        })
    },

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (!row) reject({ message: "No user found", status: 404 });
                else resolve({ user: row, status: 200 })
            })
        })
    },
}