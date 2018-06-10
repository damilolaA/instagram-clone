const auth = require('./auth.js'),
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
			res.status(200).json(result);
		})
		.catch(error => {
			return next({status: 400, message: 'Error authenticating user'});
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