"use strict";

// TODO remove this schema
var Schema = require("mongoose").Schema,
    Sample = new Schema({
        name: {
            type: String,
        },
    });

module.exports = Sample;
