const express        = require('express'),
	    Router         = express.Router(),
	    userController = require('./user-controller.js'),
	    authController = require('../auth/auth-controller.js');

Router.route('/')
	.get(authController.verifyUser, userController.user);

Router.route('/register')
	.post(userController.register);

Router.route('/users')
	.get(userController.getUsers);

module.exports = Router;