const express = require('express'),
	  api = express(),
	  userRouter = require('./v1/user/user-router.js'),
	  postRouter = require('./v1/post/post-router.js');

api.use('/user', userRouter);
api.use('/post', postRouter);

module.exports = api;