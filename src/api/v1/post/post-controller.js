const postModel = require('./post-model.js'),
			session = require('../initializeNeo4j.js');

exports.addPost = (req, res, next) => {

	const postBody = req.body;

	if(req.file) {	
		let { path } = req.file;

		postBody.image = path;
	}
	
	const { image, user, caption } = postBody;	

	postModel.addPost(session, user, image, caption)
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err);
		})
}