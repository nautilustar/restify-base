"use strict";

var util = require("util"),
    ms     = require("ms"),
    debug  = require("nautilustar-debug")(),
    reqNo  = 0;

module.exports = function (server, restify){
    server.on("request", logAccess);
    Object.keys(restify.errors)
      .forEach((errName) => server.on(errName.replace(/Error$/, ""), errorHandler));
};

function errorHandler (req, res, err, cb) {
    debug.stack.error(err);
    return cb();
}

function logAccess(req, resp) {
    req.reqNo = reqNo;
    var reqName = util.format(
          "#%s [%s] %s <= (%s && %s)", reqNo++, req.method, req.url,
          req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress,
          req.userAgent()
        ),
        start = Date.now();
    debug.log(reqName);
    resp.on("finish", () => debug.log(reqName + " " + ms(Date.now() - start)));
}
