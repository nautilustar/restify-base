const logger = require('../../util/logger');

class Controller {
    ping(req, res, next) {
        res.send('pong');
        return next();
    }
}

module.exports = new Controller();
