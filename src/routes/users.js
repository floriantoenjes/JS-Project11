"use strict";

const express = require("express");
const basicAuth = require("basic-auth");
const router = express.Router();
const User = require("../models/user");

router.get("/", function (req, res, next) {
    const emailAddress = basicAuth(req).name;
    User.find({emailAddress: emailAddress}, function (err, user) {
        if (err) {
            next(err);
        }
        res.json(user);
    })

});

router.post("/", function (req, res, next) {
    const user = new User(req.body);
    user.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.status(201);
        res.location("/");
        res.send();
    });
});

module.exports = router;
