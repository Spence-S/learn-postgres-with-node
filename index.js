require('dotenv').config();
const logger = require('morgan');
const express = require('express');
const routes = require('./routes');
const db = require('./db');

const app = express();

app.use(logger('dev'));

// Select statement routes
app.use('/select', routes.selectRoutes);

app.listen(3333, console.log('Listening on port 3333'));

module.exports = app;
