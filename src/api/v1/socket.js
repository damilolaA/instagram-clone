const socket = require('socket.io'),
			authController = require('./auth/auth-controller.js');

exports.init = (server) => {
	console.log('socket started');

	let io = socket.listen(server),
	follow = io.of('/follow');

	follow.use(authController.socketAuthHandshake);

	handleFollow(follow);
}

const handleFollow = follow => {
	follow.on('connection', client => {
		console.log(client.handshake.query.user.username + " connected to the follow socket");

		client.on('disconnecting', details => {
			console.log(client.handshake.query.user.username + " disconnecting from follow socket");
		})
	})
}