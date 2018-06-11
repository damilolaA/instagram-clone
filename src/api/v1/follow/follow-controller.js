const session     = require('../initializeNeo4j.js'),
			followModel = require('./follow-model.js');

exports.follow = (req, res, next) => {
	const { id } = req.user,
				userId = req.params.id;

	followModel.follow(session, id, userId)
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			console.log(err);
		})
}