"use strict";

// TODO remove this route
module.exports = [
    {
        method: "get",
        uri: "*",
        handlers: [{
            controller: "static",
            callback: "public",
        }],
    },
];