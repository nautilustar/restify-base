"use strict";

var fs           = require("fs"),
    path         = require("path"),
    debug        = require("nautilustar-debug")(),
    mongoose     = require("mongoose"),
    env          = require("config/environment"),
    mongooseUtil = require("mongoose-util"),
    dbParams     = env.DB,
    models       = {},

    loadModels   = function loadModels() {
        mongoose.connect(dbParams.MONGODB_URL + dbParams.DB_NAME, dbParams.options);
        fs.readdirSync(__dirname)
          .filter((file) => file !== "index.js" && /^(?!\.).+\.js$/.test(file))
          .forEach((file) => {
              var schema = require(path.join(__dirname, file)),
                  name   = file.replace(/\.js$/, "");
              schema.plugin(mongooseUtil);
              models[name] = mongoose.model(name, schema);
              debug.info("Model '%s' loaded", name);
          });
        return models;
    };

mongoose.Promise = global.Promise;

// configure connection listeners
mongoose.connection
  .on("connected", () => {
      debug.info("Database %s connected", dbParams.MONGODB_URL + dbParams.DB_NAME);
      if (env.name === "test") {
          mongoose.connection.db.dropDatabase((err) => {
              if (err) return debug.error(err);
              debug.info("TEST environment, database dropped");
          });
      }
  })
  .on("open", () => debug.info("MongoDB open."))
  .on("disconnected", () => debug.warn("MongoDB disconnected."))
  .on("error", (err) => debug.error("MongoDB error: " + err));

module.exports = loadModels();
