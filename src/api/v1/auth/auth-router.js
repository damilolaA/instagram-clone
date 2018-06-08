const express = require('express'),
			Router = express.Router(),
			authController = require('./auth-controller.js');


Router.route('/login')
	.post(authController.login)


module.exports = Router;