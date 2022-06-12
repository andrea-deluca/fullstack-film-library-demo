"use strict";
const express = require("express");
const { check, validationResult } = require('express-validator');
const router = express.Router();
const filmsModel = require('../models/filmsModel');

const withAuth = require('../middlewares/withAuth');

// GET /films/all
router.get("/films/all", withAuth, (req, res) => {
    filmsModel.retrieveAll(req.user)
        .then((data) => {
            res.status(data.status).json(data.films);
        }).catch((error) => {
            res.status(error.status).json(error.message);
        })
});

// GET /films/favorite
router.get("/films/favorite", withAuth, (req, res) => {
    filmsModel.retrieveFavorite(req.user)
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })
});

// GET /films/best-rated
router.get("/films/best-rated", withAuth, (req, res) => {
    filmsModel.retrieveBestRated(req.user)
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })
});

// GET /films/seen-last-month
router.get("/films/seen-last-month", withAuth, (req, res) => {
    filmsModel.retrieveSeenLastMonth(req.user)
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })
});

// GET /films/unseen
router.get("/films/unseen", withAuth, (req, res) => {
    filmsModel.retrieveUnseen(req.user)
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })
});

// GET /api/films/:id
router.get("/films/:id", withAuth, (req, res) => {
    filmsModel.retrieveById(req.params.id, req.user)
        .then((data) => {
            res.status(data.status).json(data.film);
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })
});

//POST /films/add-film
router.post("/films/add-film", [
    check('title').not().isEmpty(),
    check('favorite').isInt({ min: 0, max: 1 }),
    check('watchdate').isDate({ format: 'YYYY-MM-DD', strictMode: true }).optional(),
    check('rating').isInt({ min: 0, max: 5 })
], withAuth, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    filmsModel.addFilm(req.body, req.user)
        .then((data) => {
            res.status(data.status).end();
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })

});

//PUT /films/update-film/:id
router.put("/films/update-film/:id", [
    check('title').not().isEmpty(),
    check('favorite').isInt({ min: 0, max: 1 }),
    check('watchdate').isDate({ format: 'YYYY-MM-DD', strictMode: true }).optional(),
    check('rating').isInt({ min: 0, max: 5 })
], withAuth, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    filmsModel.retrieveById(req.params.id, req.user)
        .then(() => {
            filmsModel.updateFilm(req.body, req.params.id, req.user)
                .then((data) => {
                    res.status(data.status).end();
                })
                .catch((error) => {
                    res.status(error.status).json(error.message);
                })
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        })
});

//PUT /films/update-favorite/:id
router.put("/films/update-favorite/:id", [
    check('favorite').isInt({ min: 0, max: 1 }),
], withAuth, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    filmsModel.retrieveById(req.params.id, req.user)
        .then(() => {
            filmsModel.markAsFavorite(req.body, req.params.id, req.user)
                .then((data) => {
                    res.status(data.status).end();
                })
                .catch((error) => {
                    res.status(error.status).json(error.message);
                })
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        })
});

//PUT /films/update-rating/:id
router.put("/films/update-rating/:id", [
    check('rating').isInt({ min: 0, max: 5 })]
    , (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        filmsModel.retrieveById(req.params.id, req.user)
            .then(() => {
                filmsModel.updateRating(req.body, req.params.id, req.user)
                    .then((data) => {
                        res.status(data.status).end();
                    })
                    .catch((error) => {
                        res.status(error.status).json(error.message);
                    })
            })
            .catch(error => {
                res.status(error.status).json(error.message);
            })
    });

//DELETE /films/delete-film/:id
router.delete("/films/delete-film/:id", withAuth, (req, res) => {
    filmsModel.retrieveById(req.params.id, req.user)
        .then(() => {
            filmsModel.deleteFilm(req.params.id, req.user)
                .then((data) => {
                    res.status(data.status).end();
                })
                .catch((error) => {
                    res.status(error.status).json(error.message);
                })
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        })

});

module.exports = router;