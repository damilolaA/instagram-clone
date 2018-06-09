const express = require('express'),
			Router  = express.Router(),
			postController = require('./post-controller.js'),
	  	uploadImage = require('../fileUploads.js'),
	  	authController = require('../auth/auth-controller.js');

Router.route('/')
	.post(authController.verifyUser, uploadImage, postController.addPost)
	.get(authController.verifyUser, postController.getPost)


module.exports = Router;