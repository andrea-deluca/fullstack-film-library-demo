"use strict";
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const session = require('express-session');
const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const sessionsRouter = require("./routes/sessions");
const filmsRouter = require("./routes/filmsRouter");

const usersModel = require("./models/usersModel");

passport.use(
    new LocalStrategy(function (username, password, done) {
        usersModel.getUserByEmail(username)
            .then((res) => {
                crypto.scrypt(password, res.user.salt, 32, function (err, hashedPassword) {
                    if (err) return done({ message: 'Error with crypto', status: 500 });

                    const passwordHex = Buffer.from(res.user.hash, 'hex');

                    if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
                        return done({ message: 'Incorrect username or password', status: 401 });
                    return done(null, { id: res.user.id, email: res.user.email, name: res.user.name });
                })
            })
            .catch(err => {
                if (err.status === 404) return done({ message: 'Incorrect username or password', status: 401 });
                else return done(err);
            })
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    usersModel.getUserById(id)
        .then((res) => {
            done(null, { id: res.user.id, email: res.user.email, name: res.user.name });
        }).catch(err => {
            done(err, null);
        });
});


// Init express
const PORT = 9000;
const app = express();

app.use(session({
    secret: 'a secret sentence not to share with anybody and anywhere, userd to sign the session ID cookie',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Set-up middlewares
app.use(logger("dev"));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

/* ---  APIs  --- */
app.use("/api", filmsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/`)
);
