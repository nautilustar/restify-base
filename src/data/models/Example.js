"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO example schema
const Example = new Schema({
    name: {
        type: String,
    },
});

module.exports = Example;
