"use strict";

var fs   = require("fs"),
    path = require("path");

module.exports = usePath;

function usePath (server, basepath) {
    basepath = path.resolve(basepath);

    var routerHelper = function (dirname, file){

        var filepath = Array.prototype.join.call([dirname, file], "/"),
            stat = fs.statSync(filepath);

        if (stat.isFile()) {
            var modulePath = path.relative(__dirname, filepath).replace(/\\/g, "/"),
                uri = "/" + path.relative(basepath, filepath)
                  .replace(/\\/g, "/")
                  .replace(/\.js$/, "");

            require(modulePath).forEach((route) => {
                var params = [uri + (route.url || "")];
                route.handlers.forEach((handler) =>
                  params.push(require("controllers/" + handler.controller)[handler.callback]));
                server[route.method].apply(server, params);
            });
        } else if (stat.isDirectory()) {
            dirname = filepath;
            fs.readdirSync(dirname).forEach((file) => routerHelper(dirname, file));
        }
    };

    fs.readdirSync(basepath)
      .forEach((file) => routerHelper(basepath, file));
}
