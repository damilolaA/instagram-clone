var http    = require('http'),
    express = require('express'),
    app     = express(),
    server  = http.Server(app),
    bps     = require('body-parser'),
    morgan  = require('morgan'),
    io      = require('socket.io')(server),
    api     = require('../api/api.js');

app.use(bps.json());
app.use(bps.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api/v1/', api);

io.on('connection', (socket) => {
    socket.emit('holla');
    socket.on('disconnect', () => {
        console.log('socket disconnected');
    })
})

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
    next();
});

module.exports = server;