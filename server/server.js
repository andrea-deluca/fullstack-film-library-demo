'use strict';
const cors = require('cors');
const express = require('express');
const logger = require('morgan');

const filmsRouter = require('./routes/filmsRouter');

// Init express
const PORT = 9000;
const app = express();

// Set-up middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());

/* ---  APIs  --- */
app.use("/api", filmsRouter);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));