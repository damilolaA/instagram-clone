var http    = require('http'),
    express = require('express'),
    app     = express(),
    server  = http.Server(app),
    bps     = require('body-parser'),
    morgan  = require('morgan'),
    socket  = require('../api/v1/socket.js'),
    api     = require('../api/api.js');

app.use(bps.json());
app.use(bps.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api/v1/', api);

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
    next();
});

socket.init(server);

module.exports = server;