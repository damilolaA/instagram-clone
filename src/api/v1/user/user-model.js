const uuid4 = require('uuid/v4'),
			bcrypt = require('bcrypt-nodejs'),
			_ = require('lodash');

const encryptPassword = (plainPassword) => {
	let salt = bcrypt.genSaltSync(10);

	return bcrypt.hashSync(plainPassword, salt);
}

const authenticatePassword = (plainPassword, hash) => {
	return bcrypt.compareSync(plainPassword, hash);
}

exports.registerUser = (session, username, password) => {
	return session.run('MATCH (user:User {username: {username}}) RETURN user', {username:username})
		.then(result => {
			if(!_.isEmpty(result.records)) {

				throw {error: 'username already in use', status:400};
			} else {

				return session.run('CREATE (user:User {id: {id}, username:{username}, password:{password}, date:{date}}) RETURN user', {
					id: uuid4(),
					username: username,
					password: encryptPassword(password),
					date: Date.now()
				})
				.then(result => {
					return result.records[0].get('user');
				})
				.catch(error => {
					throw new Error(error);
				})
			}
		})
}

exports.loginUser = (session, username, plainPassword) => {
	return session.run('MATCH (user:User {username: {username}}) RETURN user', {
		username: username,
		password: plainPassword
	})
	.then(result => {
		if(_.isEmpty(result.records)) {
			throw {message: 'Username does not exist', status:400};
		} else {

			let user = result.records[0].get('user'),
			{ password, id } = user.properties;

			if(!authenticatePassword(plainPassword, password)) {
				throw {message: "password is not correct", status:403}
			}
			return {token: id}
		}
	});
}