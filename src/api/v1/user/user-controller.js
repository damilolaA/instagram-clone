const neo4j = require('neo4j-driver'),
	  { neo4jPass } = require('../../../../config/config.js'),
	  userModel = require('./user-model.js'),
	  driver = neo4j.v1.driver("bolt://192.168.99.100", neo4j.v1.auth.basic('neo4j', neo4jPass)),
	  session = driver.session();


exports.register = (req, res, next) => {
	const { username, password } = req.body;

	if(!username) {
		return next(new Error('This field is required'));
	}

	if(!password) {
		throw {password: 'This field is required', status: 400}
	}

	userModel.registerUser(session, username, password)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			res.status(400).send(error);
		})
}