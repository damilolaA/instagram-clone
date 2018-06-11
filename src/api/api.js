const express    = require('express'),
	    api        = express(),
	    userRouter = require('./v1/user/user-router.js'),
	    postRouter = require('./v1/post/post-router.js'),
	    authRouter = require('./v1/auth/auth-router.js'),
	    followRouter = require('./v1/follow/follow-router.js');

api.use('/user', userRouter);
api.use('/post', postRouter);
api.use('/auth', authRouter);
api.use('/follow', followRouter);

module.exports = api;