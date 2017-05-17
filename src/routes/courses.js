"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const Review = require("../models/review");

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
    Course.update({
        _id: req.params.courseId
    }, {
        $set: req.body
    }, function (err, course) {
        if (err) {
            return next(err);
        }
        res.status(204);
        res.send();
    });
});

router.post("/:courseId/reviews", function (req, res, next) {
    Course.findById(req.params.courseId, function (err, course) {

        const review = new Review(req.body);
        review.save(function (err, review) {
            if (err) {
                err.status = 400;
                return next(err);
            }
            course.reviews.push(review);
            course.save(function (err, course) {
                if (err) {
                    return next(err);
                }
                res.status(201);
                res.location("/" + req.params.courseId);
                res.send();
            });
        });
    });
});



module.exports = router;
