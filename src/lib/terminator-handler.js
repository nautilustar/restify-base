"use strict";

var debug = require("nautilustar-debug")(),

    terminatorHandler = function terminatorHandler() {
        if (!(this instanceof terminatorHandler)) return new terminatorHandler();

        var self = this;

        self.setup = function setup() {
            process.on("exit", function () {
                self.terminator();
            });

            [
                "SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT",
                "SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM",
            ].forEach(function (sig) {
                process.once(sig, function () {
                    self.terminator(sig);
                });
            });
        };

        self.terminator = function terminator(sig) {
            if ("string" === typeof sig) {
                debug.warn("Received %s from process %s - terminating app ...",
                    sig, process.argv[1]);
                process.kill(process.pid, sig);
            }
            debug.warn("Node server stopped.");
        };

    };

module.exports = terminatorHandler;
