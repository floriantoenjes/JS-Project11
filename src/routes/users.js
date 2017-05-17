"use strict";

const express = require("express");
const basicAuth = require("basic-auth");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const mid = require("../middleware");

router.get("/", mid.getCredentials, function (req, res, next) {
    if (req.user) {
        res.json(req.user);
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
