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

	var userId = req.params.id;

	userModel.getUser(session, userId)
		.then(user => {
			res.status(200).json(user)
		})
		.catch(err => {
			return next(new Error(err))
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