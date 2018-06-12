const session     = require('../initializeNeo4j.js'),
			followModel = require('./follow-model.js');

exports.follow = (req, res, next) => {
	const { id } = req.user,
				userId = req.body.id;

	followModel.follow(session, id, userId)
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			return next({status: 400, message: 'could not follow user'});
		})
}