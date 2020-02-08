"use strict";

const express = require('express');
const app = express();
var server = require('http').createServer(app);

const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const path = require('path');

// app.use(express.static('public'));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application / vnd.api + json'
}));
app.use(methodOverride());
app.use(cors());
const appRoutes = require('./src/routes.js')(app)
server.listen(5000, () => {
  console.log('Server listening at port 5000');
})
