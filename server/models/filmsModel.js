'use strict';

const dayjs = require('dayjs');
const db = require('../db/dbmiddleware');

module.exports = {

    retrieveAll: (user) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE user = ?";
            db.all(query, [user.id], (err, rows) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (rows.length === 0) reject({ message: "No films found", status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveFavorite: (user) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE favorite=? and user = ?";
            db.all(query, ["1", user.id], (err, rows) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (rows.length === 0) reject({ message: "No favorite films found", status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveBestRated: (user) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE rating=? and user = ?";
            db.all(query, ["5", user.id], (err, rows) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (rows.length === 0) reject({ message: "No best rated films found", status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveSeenLastMonth: (user) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE watchdate IS NOT NULL and user = ?";
            db.all(query, [user.id], (err, rows) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (rows.length === 0) reject({ message: "No seen last month films found", status: 404 });
                else {
                    const films = rows.filter((film) => {
                        return dayjs(film.watchdate).isAfter(dayjs().subtract(30, "d"));
                    });
                    resolve({ films, status: 200 });
                }
            });
        });
    },

    retrieveUnseen: (user) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE watchdate IS NULL AND user= ?";
            db.all(query, [user.id], (err, rows) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (rows.length === 0) reject({ message: "No unseen films found", status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveById: (id, user) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE id = ? and user = ?";
            db.get(query, [id, user.id], (err, row) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (!row) reject({ message: "No film found", status: 404 });
                else resolve({ film: row, status: 200 });
            });
        });
    },

    addFilm: (film, user) => {
        return new Promise((resolve, reject) => {
            const queryLastID = "SELECT max(id) FROM films";
            db.get(queryLastID, [], (err, rows) => {
                if (err) reject({ message: err.message, status: 500 });
                else if (rows.length === 0) reject({message: "No rows found for IDs", status: 404 });
                else {
                    const id = rows.id + 1;
                    const query = 'INSERT INTO films(id, title, plot, favorite, watchdate, rating, image, user) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
                    db.run(query, [id, film.title, film.plot, film.favorite, film.watchdate, film.rating, film.image, user.id], function (err) {
                        if (err) reject({ message: err.message, status: 500 });
                        else resolve({ status: 200 });
                    });
                }
            })
        });
    },

    updateFilm: (data, id, user) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE films SET title=?, plot=?, favorite=?, watchdate=?, rating=?, image=? WHERE id=? AND user = ?";
            db.run(query, [data.title, data.plot, data.favorite, data.watchdate, data.rating, data.image, id, user.id], function (err) {
                if (err) reject({ message: err.message, status: 500 });
                else resolve({ status: 200 });
            })
        });
    },

    markAsFavorite: (data, id, user) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE films SET favorite=? WHERE id=? and user = ?";
            db.run(query, [data.favorite, id, user.id], (err) => {
                if (err) reject({ message: err.message, status: 500 });
                else resolve({ status: 200 });
            })
        });
    },

    updateRating: (data, id, user) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE films SET rating=? WHERE id=? AND user= ?";
            db.run(query, [parseInt(data.rating), id, user.id], function (err) {
                if (err) reject({ message: err.message, status: 500 });
                else resolve({ status: 200 });
            })
        });
    },

    deleteFilm: (id, user) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM films WHERE id=? and user = ?";
            db.run(query, [id, user.id], function (err) {
                if (err) reject({ message: err.message, status: 500 });
                else resolve({ status: 200 });
            });
        });
    },
}