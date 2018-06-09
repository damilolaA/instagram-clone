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
			return next({status: 400, message: 'Post could not be added'});
		})
}

exports.getPost = (req, res, next) => {

	if(!req.user) {
		return next({status: 400, message: 'token expired, please login'});
	}

	let { id } = req.user;

	postModel.getPost(session, id)
		.then(result => {
			
			let data = [];

			result.forEach((post) => {
				let info = post.get('post');
				
				let { properties } = info;

				data.push(properties);
			})
			res.status(200).json(data);
		})
		.catch(err => {
			return next({status: 400, message: err});
		})
}