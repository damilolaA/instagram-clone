require('dotenv').config();
const http = require('http');

var app = http.createServer(function(req, res) {
	res.statusCode = 200;
	res.end('Hello World');
});

app.listen(4000);