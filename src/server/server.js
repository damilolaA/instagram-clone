var express   = require('express'),
    app       = express(),
    bps       = require('body-parser'),
    morgan    = require('morgan'),
    api       = require('../api/api.js');

app.use(bps.json());
app.use(bps.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use('/api/v1/', api);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).send(err.message);
    next();
})

module.exports = app;