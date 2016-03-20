"use strict";

var should       = require("should"),
    supertest    = require("supertest"),
    // faker        = require("faker"),
    STATUS_CODES = require("http-status-codes"),
    env          = require("../src/config/environment"),
    request      = supertest(env.BASE_URL + "/api/v1");

// TODO remove the test_sample
describe("Ping", () => {

    it("Request to ping", (done) => {
        request.get("/ping")
            .set("Accept", "text/plain")
            .expect("Content-Type", /text\/plain/)
            .expect(STATUS_CODES.OK, "pong")
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res.body);
                done();
            });
    });

});
