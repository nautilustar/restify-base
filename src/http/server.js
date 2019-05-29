const restify = require('restify');
const RequestListener = require('./request-listener');
const routerfy = require('./routerfy');

class Server {
    constructor(config) {
        this.port = config.port;
        this.logger = config.log;
        this.server = restify.createServer(config);

        let requestListener = new RequestListener();
        requestListener.setup(this.server);

        this.server.use(restify.plugins.queryParser());
        this.server.use(restify.plugins.bodyParser());

        routerfy(this.server, __dirname + "/routes", __dirname + "/controllers");
    }

    start() {
        this.server.listen(this.port, '0.0.0.0', (err) => {
            if (err) this.log.error(err);
            this.logger.info('%s listening at %s', this.server.name, this.server.url);
        });
    }
}

module.exports = Server;