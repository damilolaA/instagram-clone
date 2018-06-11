const express = require('express'),
			Router  = express.Router(),
			authController   = require('../auth/auth-controller.js'),    
			followController = require('./follow-controller.js');

Router.route('/:id')
	.post(authController.verifyUser, followController.follow);

module.exports = Router;