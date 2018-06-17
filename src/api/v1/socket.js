const socket = require('socket.io'),
			authController = require('./auth/auth-controller.js'),
			postController = require('./post/post-controller.js'),
			followController = require('./follow/follow-controller.js');

exports.init = (server) => {
	console.log('socket started');

	let io = socket.listen(server),
	follow = io.of('/follow');
	like   = io.of('/like');

	follow.use(authController.socketAuthHandshake);
	like.use(authController.socketAuthHandshake);

	handleFollow(follow);
	handleLikes(like);
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

const handleLikes = like => {
	like.on('connection', client => {
		let { username, id } = client.handshake.query.user.properties;
		console.log(username + " has connected to like socket");

		client.on('disconnecting', details => {
			console.log(username + " is disconnecting from like socket");
		});

		client.on('like', data => {
			let { postId, userId } = data;

			postController.likePost(postId, userId)
				.then(response => {
					//console.log(response.records[0]);
					let { properties } = response.records[0].get('p');
					
					client.emit('liking', properties);
				})
				.catch(error => {
					console.log(error);
				})
		})
	})
}