"use strict";

const util = require("util");
const ms = require("ms");
const logger = require("../util/logger");
const errors = require('restify-errors');

class RequestListener {
    setup(server) {
        server.on('request', this.onStart.bind(this));
        this._setupErrorLog(server);
    }

    _setupErrorLog(server) {
        Object.keys(errors)
            .filter((err) => err.match(/Error$/) && errors[err].displayName)
            .map((err) => err.replace(/Error$/, ''))
            .forEach((err) => server.on(err, this.onError.bind(this)));
    }

    _buildReqName(req) {
        req.ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        return util.format("%s: %s [%s] %s <= (%s && %s)",
            new Date().toJSON(), req.id(), req.method, req.url, req.ip, req.userAgent()
        );
    }

    onStart(req, res) {
        let startedAt = Date.now(),
            reqName = this._buildReqName(req);

        logger.log(reqName);
        res.on("finish", this.onFinish.bind(this, reqName, startedAt));
    }

    onError(req, res, err, cb) {
        logger.stack.error(err);
        res.send(err);
        return cb();
    }

    onFinish(reqName, startedAt) {
        logger.log(reqName + " " + ms(Date.now() - startedAt));
    }
}

module.exports = RequestListener;