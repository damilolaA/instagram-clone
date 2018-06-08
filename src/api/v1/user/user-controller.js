const userModel = require('./user-model.js'),
			session = require('../initializeNeo4j.js');

exports.register = (req, res, next) => {
	const { username, password, email } = req.body;

	if(!username) {
		return next({status: 400, message: 'Username field is required'});
	}

	if(!password) {
		return next({status:400, message: 'Password field is required'});
	}

	if(!email) {
		return next({status:400, message: 'Email field is required'});
	}

	userModel.registerUser(session, username, email, password)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			res.status(400).send(error);
		})
}

exports.user = (req, res, next) => {

	if(!req.user) {
		return next(new Error('could not fetch user'));
	}

	res.status(200).json(req.user);
}

exports.verifyUser = (req, res, next) => {

	if(!req.headers.authorization) {
		return next(new Error('please provide authorization token'));
	}

	userModel.verifyUser(session, req.headers.authorization)
		.then(user => {
			let { properties } = user;
			req.user = properties;
			next();
		})
		.catch(err => {
			return next(new Error(err));
		})
}

exports.login = (req, res, next) => {
	const { username, password } = req.body;

	if(!username) {
		return next({status: 400, message: 'Username field is required'});
	}

	if(!password) {
		return next({status:400, message: 'Password field is required'});
	}

	userModel.loginUser(session, username, password)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			return next({status: 400, message: 'Error authenticating user'});
		})
}