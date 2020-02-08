"use strict";

const controller = require('./controller.js');

const routes = function(app) {
  app.get(  '/hello/',                controller.hello);
  app.get(  '/api/donations/',        controller.getDonations);
}

module.exports = routes;
