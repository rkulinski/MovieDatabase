var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString(), { useMongoClient: true, promiseLibrary: global.Promise });
apiController(app);

app.listen(port);