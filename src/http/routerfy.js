"use strict";

const fs = require("fs");
const path = require("path");
const logger = require('../util/logger');

class Routerfy {
    constructor(server, routesDir, controllersDir) {
        this.server = server;
        this.routesDir = path.resolve(routesDir);
        this.controllersDir = path.resolve(controllersDir) + "/";
    }

    setup() {
        fs.readdirSync(this.routesDir)
            .forEach(this._search.bind(this, this.routesDir));
    }

    _search(dirname, file) {
        var filepath = Array.prototype.join.call([dirname, file], "/"),
            stat = fs.statSync(filepath);

        if (stat.isFile()) {
            let modulePath = __dirname + "/" + path.relative(__dirname, filepath)
                .replace(/\\/g, "/");
            let uri = "/" + path.relative(this.routesDir, filepath)
                .replace(/\\/g, "/")
                .replace(/(\/?index)?\.js$/, "");

            require(modulePath).forEach(route => {
                let moduleUri = uri + (route.uri || "");
                let params = route.handlers.map(handler => {
                    let ctrlFile = this.controllersDir + handler.controller;
                    let ctrl = require(ctrlFile);
                    logger.debug("[" + route.method.toUpperCase() + "]\t" + moduleUri + " => " + ctrlFile + "::" + handler.callback);
                    return ctrl[handler.callback].bind(ctrl);
                });
                params.unshift(moduleUri);

                this.server[route.method].apply(this.server, params);
            });
        } else if (stat.isDirectory()) {
            dirname = filepath;
            fs.readdirSync(dirname)
                .forEach(this._search.bind(this, dirname));
        }
    }
}

module.exports = function (server, routesDir, controllersDir) {
    let routerfy = new Routerfy(server, routesDir, controllersDir);
    routerfy.setup();
};