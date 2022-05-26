'use strict';

const dayjs = require('dayjs');
const db = require('../db/dbmiddleware');

module.exports = {

    retrieveAll: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films";
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject({ err, status: 500 });
                    return;
                }
                if (rows.length === 0) reject({ status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveFavorite: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE favorite=?";
            db.all(query, ["1"], (err, rows) => {
                if (err) {
                    reject({ err: err.message, status: 500 });
                    return;
                }

                if (rows.length === 0) reject({ status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveBestRated: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE rating=?";
            db.all(query, ["5"], (err, rows) => {
                if (err) {
                    reject({ err: err.message, status: 500 });
                    return;
                }

                if (rows.length === 0) reject({ status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveSeenLastMonth: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE watchdate IS NOT NULL";
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject({ err: err.message, status: 500 });
                    return;
                }

                if (rows.length === 0) reject({ status: 404 });
                else {
                    const films = rows.filter((film) => {
                        return dayjs(film.watchdate).isAfter(dayjs().subtract(30, "d"));
                    });
                    resolve({ films, status: 200 });
                }
            });
        });
    },

    retrieveUnseen: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE watchdate IS NULL";
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject({ err: err.message, status: 500 });
                    return;
                }

                if (rows.length === 0) reject({ status: 404 });
                else resolve({ films: rows, status: 200 });
            });
        });
    },

    retrieveById: (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM films WHERE id=?";
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject({ err: err.message, status: 500 });
                    return;
                }

                if (!row) reject({ status: 404 });
                else resolve({ film: row, status: 200 });
            });
        });
    },

    addFilm: (film) => {
        return new Promise((resolve, reject) => {
            const queryLastID = "SELECT max(id) FROM films ";
            db.get(queryLastID, [], (err, rows) => {
                if (err) {
                    reject({ err: err.message, status: 500 });
                    return;
                }

                if (rows.length === 0) reject({ status: 404 });
                else {
                    const id = rows.id + 1;
                    const query = 'INSERT INTO films(id, title, favorite, watchdate, rating, user) VALUES(?,?, ?, ?, ?, ?)';
                    db.run(query, [id, film.title, film.favorite, film.watchdate, film.rating, film.user], function (err) {
                        if (err) reject({ err: err.message, status: 500 });
                        else resolve({ film: { id: this.lastID, ...film }, status: 200 });
                    });
                }
            })
        });
    },

    updateFilm: (data, id) => {
        return new Promise((resolve, reject) => {
            console.log(data, id)
            const query = "UPDATE films SET title=?, plot=?, favorite=?, watchdate=?, rating=?, image=?, user=? WHERE id=?";
            db.run(query, [data.title,  data.plot, data.favorite, data.watchdate, data.rating, data.image, data.user, id], function (err) {
                if (err) reject({ err: err.message, status: 500 });
                else resolve({ film: { id, ...data }, status: 200 });
            })
        });
    },

    markAsFavorite: (data, id) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE films SET favorite=? WHERE id=?";
            db.run(query, [data.favorite, id], (err) => {
                if (err) reject({ err: err.message, status: 500 });
                else resolve({ film: { ...data, id }, status: 200 });
            })
        });
    },

    updateRating: (data, id) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE films SET rating=? WHERE id=?";
            db.run(query, [parseInt(data.rating), id], function (err) {
                if (err) reject({ err: err.message, status: 500 });
                else resolve({ film: { ...data, id }, status: 200 });
            })
        });
    },

    //Delete a new film
    deleteFilm: (id) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM films WHERE id=?";
            db.run(query, [id], function (err) {
                if (err) {
                    reject({ err: err.message, status: 500 });
                    return;
                }
                else resolve({ status: 200 });
            });
        });
    },
}