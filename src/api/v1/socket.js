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
		let { username } = client.handshake.query.user.properties;
		console.log(username + " connected to the follow socket");

		client.on('disconnecting', details => {
			console.log(username + " disconnecting from follow socket");
		})
	})
}