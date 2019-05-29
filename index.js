const config = require('./config');

const Server = require('./src/http/server');
const terminator = require("./src/util/terminator-handler");

terminator.setup();
const server = new Server(config.server);

server.start();