"use strict";

const logger = require("./logger");

class TerminatorHandler {
    setup() {
        process.on("exit", () => this.terminate());

        [
            "SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT",
            "SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM",
        ].forEach(sig => process.once(sig, () => this.terminate(sig)));
    }

    terminate(sig) {
        if ("string" === typeof sig) {
            logger.warn("Received %s from process %s - terminating app ...",
                sig, process.argv[1]);
            process.kill(process.pid, sig);
        }
        logger.warn("Node server stopped.");
    }
}

module.exports = new TerminatorHandler();