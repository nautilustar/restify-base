"use strict";

var _       = require("lodash"),
    env     = {},
    envName = "development",
    environment;

env.development = {
    HTTP_PROTOCOL: "http",
    HTTP_PORT: process.env.HTTP_PORT || 3000,
    HTTP_HOST: process.env.HTTP_HOST || "localhost",
    DB: {
        MONGODB_URL: process.env.MONGODB_URL || process.env.OPENSHIFT_MONGODB_URL || "mongodb://localhost:27017/",
        DB_NAME    : process.env.DB_NAME || process.env.APP_NAME,
        options    : {},
    },
};

env.test = {};

env.test = _.defaultsDeep(env.test, env.development);

if (process.env.NODE_ENV && env[process.env.NODE_ENV])
    envName = process.env.NODE_ENV;

environment = env[envName];

environment.name = envName;
environment.BASE_URL = environment.HTTP_PROTOCOL + "://" + environment.HTTP_HOST + ":" + environment.HTTP_PORT;

module.exports = environment;
