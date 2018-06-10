require('dotenv').config();
const app     = require('./src/server/server.js'),
	   { port } = require('./config/config.js');

console.log('Application started on port ' + port);

app.listen(port);