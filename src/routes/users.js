"use strict";

const express = require("express");
const basicAuth = require("basic-auth");
const router = express.Router();
const User = require("../models/user");

router.get("/", function (req, res, next) {
    const auth = basicAuth(req);
    if (auth) {
        const emailAddress = basicAuth(req).name;
        User.find({
            emailAddress: emailAddress
        }, function (err, user) {
            if (err) {
                next(err);
            }
            res.json(user);
        })
    } else {
        next();
    }
});

router.post("/", function (req, res, next) {
    const user = new User(req.body);
    user.save(function (err, user) {
        if (err) {
            err.status = 400;
            return next(err);
        }
        res.status(201);
        res.location("/");
        res.send();
    });
});

UserSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
})



module.exports = router;
