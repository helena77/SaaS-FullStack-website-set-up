"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var ApplicationFormRoute_1 = require("./routes/ApplicationFormRoute");
var RecommendationListRoute_1 = require("./routes/RecommendationListRoute");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var router = express.Router();
        // add user routes
        this.addRoutes(router);
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    App.prototype.addRoutes = function (router) {
        var recommendationList = new RecommendationListRoute_1.RecommendationListRoute();
        recommendationList.registerRoutes(router);
        var applicationForm = new ApplicationFormRoute_1.ApplicationFormRoute();
        applicationForm.registerRoutes(router);
    };
    return App;
}());
exports.App = App;
