const cloudinary = require('cloudinary'),
			postModel = require('./post-model.js'),
			session = require('../initializeNeo4j.js'),
			{
				CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET
			} = require('../../../../config/config.js');

cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET
});

exports.addPost = (req, res, next) => {

	const postBody = req.body;

	if(req.file) {
		cloudinary.uploader.upload(req.file.path, (response) => {
			if(response) {
				let imageUrl = response.secure_url;

				postBody.user = req.user.id;
				postBody.image = imageUrl;

				const { image, user, caption } = postBody;	

				postModel.addPost(session, user, image, caption)
					.then(result => {
						let { properties } = result;

						res.status(200).json(properties);
					})
					.catch(err => {
						console.log(err);
						return next({status: 400, message: 'Post could not be added'});
					})
			} else {
				return next({status: 400, message: "Error uploading to cloudinary"});
			}
		})
	} else {
		return next({status:400, message: "please select a picture to post"});
	}
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
				let info = post.get('post'),
				 { properties } = info;

				data.push(properties);
			})
			res.status(200).json(data);
		})
		.catch(err => {
			return next({status: 400, message: err});
		})
}

exports.addComment = (req, res, next) => {

	const { postId, comment } = req.body,
				{ id } = req.user;
				
	postModel.addComment(session, postId, comment, id)
		.then(result => {
		
			let data = result.records[0].get('c'),
				  { properties } = data;

			res.status(200).json(data);
		})
		.catch(error => {
			console.log(error);
			return next({status:400, message:"Could not add comment"});
		});
}

exports.likePost = (postId, userId) => {
	return new Promise((resolve, reject) => {
		postModel.likePost(session)
		 .then(result => {
			resolve(result)
		 })
		 .catch(error => {
		 	reject(error)
		 })
	});
}