const userModel = require('./user-model.js'),
			session = require('../initializeNeo4j.js'),
			sendMail = require('../mailer.js');

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
			let { properties } = result,
					{ email } = properties;

			sendMail(email)
				.then(info => {
					console.log(info);
					res.status(200).json(properties);
				})
				.catch(err => {
					console.log(err);
				})
		})
		.catch(error => {
			return next({status: 400, message: "Email or Username is already in use"});
		})
}

exports.user = (req, res, next) => {

	if(!req.user) {
		return next(new Error('could not fetch user'));
	}

	res.status(200).json(req.user);
}


