'use strict';

const express = require('express');
const logger = require('morgan');

const filmLibrary = require('./routes/filmLibrary');

// Init express
const PORT = 9000;
const app = express();

// Set-up middlewares
app.use(logger('dev'));
app.use(express.json());

/* ---  APIs  --- */
app.use("/api", filmLibrary);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));