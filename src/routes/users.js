"use strict";

const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", function (req, res, next) {

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
