const express = require('express'),
	  api = express(),
	  userRouter = require('./v1/user/user-router.js');

api.use('/user', userRouter);

module.exports = api;