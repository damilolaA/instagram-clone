const bcrypt = require('bcrypt-nodejs'),
			jwt = require('jsonwebtoken'),
			_ = require('lodash'),
			{ JWT_SECRET } = require('../../../../config/config.js');

const signToken = (userId) => {
	return jwt.sign(
		{id: userId},
		JWT_SECRET,
		{expiresIn: '24hr'}
	);
}

const authenticatePassword = (plainPassword, hash) => {
	return bcrypt.compareSync(plainPassword, hash);
}

exports.verifyUser = (session, token) => {

	return new Promise((resolve, reject) => {

		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if(err) {
				reject(err)
			} else {
				let { id } = decoded;

				session.run('MATCH (user:User { id:{id} }) RETURN user', {
					id: id
				})
				.then(result => {
					resolve(result.records[0].get('user'))
				})
				.catch(err => {
					reject(err)
				})
			}
		})
	})
}

exports.loginUser = (session, username, plainPassword) => {
	return session.run('MATCH (user:User {username: {username}}) RETURN user', {
		username: username,
		password: plainPassword
	})
	.then(result => {
		if(_.isEmpty(result.records)) {
			return {status:400, message:'username and/or password is incorrect'};
		} else {

			let user = result.records[0].get('user'),
			{ password, id } = user.properties;

			if(!authenticatePassword(plainPassword, password)) {
				return {status:400, message:'username and/or password is incorrect'};
			}

			let token = signToken(id);

			return {token: token}
		}
	})
	.catch(err => {
		return new Error(err);
	})
}

exports.findUserById = (session, userId) => {
	return session.run('MATCH (u:User { id:{userId} }) RETURN u', {
		userId: userId
	})
	.then(result => {
		if(!_.isEmpty(result.records)) {
			return result.records;
		} else {
			return new Error('no user found for user id');
		}
	})
	.catch(error => {
		return error;
	})
}