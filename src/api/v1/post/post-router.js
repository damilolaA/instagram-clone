const express = require('express'),
			Router  = express.Router(),
			postController = require('./post-controller.js'),
	  	uploadImage = require('../fileUploads.js');

Router.route('/')
	.post(uploadImage, postController.addPost);


module.exports = Router;