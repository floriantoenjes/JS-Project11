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

router.post("/", function (req, res, next) {
    const course = new Course(req.body);
    console.log(course);
    course.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.status(201);
        res.location("/");
        res.send();
    });
});

router.put("/:courseId", function (req, res, next) {
    Course.update({ _id: req.params.courseId }, { $set: req.body}, function (err, course) {
        if (err) {
            return next(err);
        }
        res.status(204);
        res.send();
    });
});





module.exports = router;
