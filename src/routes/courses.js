"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../models/course");

router.get("/", function (req, res, next) {
    Course.find({}, "title", function (err, courses) {
        if (err) {
            return next(err);
        }
        res.json(courses);
    });
});

router.get("/:courseId", function (req, res, next) {
    Course.findById(req.params.courseId).populate("reviews user").exec(function (err, course) {
        if (err) {
            return next(err);
        }
        res.json(course);
    });
});







module.exports = router;
