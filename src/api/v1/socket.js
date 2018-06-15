const socket = require('socket.io'),
			authController = require('./auth/auth-controller.js'),
			followController = require('./follow/follow-controller.js');

exports.init = (server) => {
	console.log('socket started');

	let io = socket.listen(server),
	follow = io.of('/follow');

	follow.use(authController.socketAuthHandshake);

	handleFollow(follow);
}

const handleFollow = follow => {
	follow.on('connection', client => {
		let { username, id } = client.handshake.query.user.properties;
		console.log(username + " connected to the follow socket");

		client.on('disconnecting', details => {
			console.log(username + " disconnecting from follow socket");
		});

		client.on('follow', response => {
			let { userId } = response;

			followController.follow(id, userId)
				.then(result => {
					let { properties } = result.records[0].get('u');

					client.emit('info', properties);
				})
				.catch(error => {
					return console.log(error);
				});
		});
	})
}