const neo4j = require('neo4j-driver'),
	    session = require('../initializeNeo4j.js');

exports.register = (req, res, next) => {
	const { username, password } = req.body;

	if(!username) {
		return next({status: 400, message: 'Username field is required'});
	}

	if(!password) {
		return next({status:400, message: 'Password field is required'});
	}

	userModel.registerUser(session, username, password)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			res.status(400).send(error);
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