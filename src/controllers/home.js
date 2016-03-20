"use strict";

var ctrl = {};

// TODO remove this method/controller
ctrl.ping = function (req, res, next) {
    res.send("pong");
    next();
};

module.exports = ctrl;
