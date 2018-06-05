const express = require('express'),
	  Router = express.Router(),
	  userController = require('./user-controller.js');

Router.route('/')
	.post(userController.register);


module.exports = Router;