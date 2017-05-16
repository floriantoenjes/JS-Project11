"use strict";

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user: Number,
    postedOn: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    review: String
});
