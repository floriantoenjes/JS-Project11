"use strict";

const mongoose = require("mongoose");
const User = require("./user");

const CourseSchema = new mongoose.Schema({
    // ToDo: user required?
    user: Number,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedTime: String,
    materialsNeeded: String,

    // ToDo: Don't know if following data is correct
    steps: [
        stepNumber: Number,
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    ],
    [
        _id: ObjectId
    ]

});
