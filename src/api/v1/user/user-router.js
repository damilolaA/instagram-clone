const express = require('express'),
	  Router = express.Router(),
	  userController = require('./user-controller.js');

Router.route('/')
	.get(userController.verifyUser, userController.user);

Router.route('/register')
	.post(userController.register);

Router.route('/login')
	.post(userController.login);

module.exports = Router;