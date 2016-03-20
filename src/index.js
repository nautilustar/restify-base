"use strict";

var appModulePath = require("app-module-path");

[__dirname, __dirname + "/lib"].forEach(appModulePath.addPath);

var debug      = require("nautilustar-debug")(),
    restify    = require("restify"),
    routerfy   = require("routerfy"),
    reqUtil    = require("request-util"),
    env        = require("config/environment"),
    terminator = require("terminator-handler")(),
    server     = restify.createServer();

terminator.setup();
reqUtil(server, restify);
routerfy(server, __dirname + "/routes");

server.listen(env.HTTP_PORT, (err) => {
    if (err) return debug.stack.error(err);
    debug.info("[%s] Server listen port %s", env.name, env.BASE_URL);
});
