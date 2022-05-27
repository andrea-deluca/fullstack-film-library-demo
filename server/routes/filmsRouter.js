"use strict";
const express = require("express");
const { check, validationResult } = require('express-validator');
const router = express.Router();
const filmsModel = require('../models/filmsModel');

// GET /films/all
router.get("/films/all", (req, res) => {
    filmsModel.retrieveAll()
        .then((data) => {
            res.status(data.status).json(data.films);
        }).catch((error) => {
            res.status(error.status).json(error.err);
        })
});

// GET /films/favorite
router.get("/films/favorite", (req, res) => {
    filmsModel.retrieveFavorite()
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.err);
        })
});

// GET /films/best-rated
router.get("/films/best-rated", (req, res) => {
    filmsModel.retrieveBestRated()
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.err);
        })
});

// GET /films/seen-last-month
router.get("/films/seen-last-month", (req, res) => {
    filmsModel.retrieveSeenLastMonth()
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.err);
        })
});

// GET /films/unseen
router.get("/films/unseen", (req, res) => {
    filmsModel.retrieveUnseen()
        .then((data) => {
            res.status(data.status).json(data.films);
        })
        .catch((error) => {
            res.status(error.status).json(error.err);
        })
});

// GET /api/films/:id
router.get("/films/:id", (req, res) => {
    filmsModel.retrieveById(req.params.id)
        .then((data) => {
            res.status(data.status).json(data.film);
        })
        .catch((error) => {
            res.status(error.status).json(error.err);
        })
});

//POST /films/add-film
router.post("/films/add-film", [
    check('title').not().isEmpty(),
    check('favorite').isInt({ min: 0, max: 1 }),
    check('watchdate').isDate({ format: 'YYYY-MM-DD', strictMode: true }).optional(),
    check('rating').isInt({ min: 0, max: 5 })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    filmsModel.addFilm(req.body)
        .then((data) => {
            res.status(data.status).send();
        })
        .catch((error) => {
            res.status(error.status).json(error.err);
        })

});

//PUT /films/update-film/:id
router.put("/films/update-film/:id", [
    check('title').not().isEmpty(),
    check('favorite').isInt({ min: 0, max: 1 }),
    check('watchdate').isDate({ format: 'YYYY-MM-DD', strictMode: true }).optional(),
    check('rating').isInt({ min: 0, max: 5 })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    filmsModel.retrieveById(req.params.id)
        .then(() => {
            filmsModel.updateFilm(req.body, req.params.id)
                .then((data) => {
                    res.status(data.status).send();
                })
                .catch((error) => {
                    res.status(error.status).json(data.error);
                })
        })
        .catch(error => {
            res.status(error.status).end();
        })
});

//PUT /films/update-favorite/:id
router.put("/films/update-favorite/:id", [
    check('favorite').isInt({ min: 0, max: 1 }),
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    filmsModel.retrieveById(req.params.id)
        .then(() => {
            filmsModel.markAsFavorite(req.body, req.params.id)
                .then((data) => {
                    res.status(data.status).send();
                })
                .catch((error) => {
                    res.status(error.status).json(error.err);
                })
        })
        .catch(error => {
            res.status(error.status).end();
        })
});

//PUT /films/update-rating/:id
router.put("/films/update-rating/:id", [
    check('rating').isInt({ min: 0, max: 5 })]
    , (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        filmsModel.retrieveById(req.params.id)
            .then(() => {
                filmsModel.updateRating(req.body, req.params.id)
                    .then((data) => {
                        res.status(data.status).send();
                    })
                    .catch((error) => {
                        res.status(error.status).json(error.err);
                    })
            })
            .catch(error => {
                res.status(error.status).end();
            })
    });

//DELETE /films/delete-film/:id
router.delete("/films/delete-film/:id", (req, res) => {
    filmsModel.retrieveById(req.params.id)
        .then(() => {
            filmsModel.deleteFilm(req.params.id)
                .then((data) => {
                    res.status(data.status).end();
                })
                .catch((error) => {
                    res.status(error.status).end();
                })
        })
        .catch(error => {
            res.status(error.status).end();
        })

});

module.exports = router;