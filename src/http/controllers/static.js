const restify = require('restify');

module.exports = {
    public: restify.plugins.serveStatic({
        directory: './public',
    })
};