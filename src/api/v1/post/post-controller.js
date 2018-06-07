const postModel = require('./post-model.js'),
			neo4j = require('neo4j-driver'),
			{ neo4jPass } = require('../../../../config/config.js'),
	  	driver = neo4j.v1.driver("bolt://192.168.99.100", neo4j.v1.auth.basic('neo4j', neo4jPass)),
	  	session = driver.session();


exports.addPost = (req, res, next) => {
	
	console.log(req.file);

	const { image, user, caption } = req.body;

	if(!image) {
		return next({status: 400, message: 'Image field is required'})
	}

	if(!user) {
		return next({status: 400, message: 'User field is required'})
	}

	postModel.addPost(session, image, user, caption)
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err);
		})
}