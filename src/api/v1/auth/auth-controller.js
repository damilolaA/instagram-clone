const jwt = require('jsonwebtoken'),
			auth = require('./auth.js'),
			session = require('../initializeNeo4j.js');

exports.login = (req, res, next) => {
	const { username, password } = req.body;

	if(!username) {
		return next({status: 400, message: 'Username field is required'});
	}

	if(!password) {
		return next({status:400, message: 'Password field is required'});
	}

	auth.loginUser(session, username, password)
		.then(result => {
			if(result.hasOwnProperty('message')) {
				return next({status:400, message:'Error authenticating user'});
			}
			res.status(200).json(result);
		})
		.catch(error => {
			return next({status:400, message:'Error authenticating user'});
		})
}

exports.verifyUser = (req, res, next) => {

	if(!req.headers.authorization) {
		return next(new Error('please provide authorization token'));
	}

	auth.verifyUser(session, req.headers.authorization)
		.then(user => {
			let { properties } = user;
			req.user = properties;
			next();
		})
		.catch(err => {
			return next({status:400, message:"Session expired, please login"});
		})
}

exports.socketAuthHandshake = (socket, next) => {
	let token = socket.handshake.query.token,
			userId;

	let decodeToken = jwt.decode(token);

	if(decodeToken) {
		userId = decodeToken.id;
	} else {
		return next({status: 400, message: 'You are not authorized to access this socket'});
	}

	auth.findUserById(session, userId)
		.then(result => {
			let user = result[0].get('u'),
				{ properties } = user;

			if(properties) {
				socket.handshake.query.user = user;
				return next();
			} else {
				return next({status:400, message:'You are not authorized to access this socket'});
			}
		})
		.catch(error => {
			console.log(error);
		})
}