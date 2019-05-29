"use strict";

const fs = require("fs");
const path = require("path");

const config = require('../../../config').db;
const mongoose = require("mongoose");
const logger = require("../../util/logger");
const models = { loaded: false };

const loadModels = function loadModels(config) {
    if (models.loaded)
        return models;
    const conn = mongoose.createConnection(config.url, config.options);

    fs.readdirSync(__dirname)
        .filter(file => file !== "index.js" && /^(?!\.)/.test(file))
        .forEach(file => {
            let schema = require(path.join(__dirname, file)),
                name = file.replace(/\.js$/, "");
            models[name] = conn.model(name, schema);
            logger.debug("Model '" + name + "' loaded");
        });
    models.conn = conn;
    models.loaded = true;
    return models;
};

module.exports = () => loadModels(config);