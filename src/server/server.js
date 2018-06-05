var express   = require('express'),
    app       = express(),
    bps       = require('body-parser'),
    morgan    = require('morgan');

app.use(bps.json());
app.use(bps.urlencoded({extended: true}));

app.use(morgan('dev'));

module.exports = app;