require('dotenv').config();

const logger = require('../src/util/logger');
const fs = require('fs');

const config = {
    server: {
        name: "example",
        port: process.env.HTTP_PORT,
        log: logger,
    },
    db: {
        // let url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PWD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT;
        url: process.env.MONGODB_URL || process.env.OPENSHIFT_MONGODB_URL || "mongodb://localhost:27017/",
        options: {
            dbName: process.env.DB_NAME || process.env.APP_NAME || "example",
            useNewUrlParser: true,
            useCreateIndex: true,
        },
    },
};

if (process.env.NODE_ENV == "dev") {
    config.server.formatters = {
        'application/json': function (req, res, body) {
            logger.debug(process.env.NODE_ENV);
            return JSON.stringify(body, null, 2);
        }
    };
}

if (process.env.SSL_CERT) {
    config.bot.certificate = process.cwd() + '/' + process.env.SSL_CERT;
    config.server.httpsServerOptions = {
        cert: fs.readFileSync(config.bot.certificate),
        key: fs.readFileSync(process.cwd() + '/' + process.env.SSL_KEY),
        passphrase: process.env.SSL_PASS,
    };
}

module.exports = config;