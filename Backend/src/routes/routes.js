const scrapeController = require('../../src/controller/scrapeController.js')
module.exports = function (app) {
  app.get("/api/scrape/", scrapeController.getData);

};
