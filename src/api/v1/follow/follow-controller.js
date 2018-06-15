const session     = require('../initializeNeo4j.js'),
			followModel = require('./follow-model.js');

exports.follow = (id, userId) => {

	return new Promise((resolve, reject) => {
		followModel.follow(session, id, userId)
		.then(result => {
			resolve(result);
		})
		.catch(err => {
			reject(err);
		})
	});
}
