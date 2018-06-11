const socket = require('socket.io');

exports.init = (server) => {
	let io = socket.listen(server);

	console.log('socket started');
}