require('dotenv').config();
var app = require('./src/server/server.js'),
	port = require('./config/config.js').port;

console.log('Application started on port ' + port);

app.listen(port);