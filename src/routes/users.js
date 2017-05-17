"use strict";

const express = require("express");
const basicAuth = require("basic-auth");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

router.get("/", function (req, res, next) {
    const auth = basicAuth(req);
    if (auth) {
        const emailAddress = basicAuth(req).name;
        const password = basicAuth(req).pass;

        User.findOne({
            emailAddress: emailAddress
        }, function (err, user) {
            if (err) {
                next(err);
            }
            bcrypt.compare(password, user.password, function (error, result) {
                if (error) {
                    next(error);
                }
                if (result === true) {
                    res.json(user);
                } else {
                    const error = new Error("Unauthorized");
                    error.status = 401;
                    return next(error);
                }
            });
        });
    } else {
        const err = new Error("Unauthorized");
        err.status = 401;
        return next(err);
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

module.exports = router;
