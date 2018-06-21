const uuid4 = require('uuid/v4'),
			bcrypt = require('bcrypt-nodejs'),
			_ = require('lodash');

const encryptPassword = (plainPassword) => {
	let salt = bcrypt.genSaltSync(10);

	return bcrypt.hashSync(plainPassword, salt);
}

exports.registerUser = (session, username, email, password) => {
	console.log('userModel');
	return session.run('MATCH (user:User) WHERE user.email={email} OR user.username={username} RETURN user', {
		username:username,
		email: email
	})
	.then(result => { 
		if(!_.isEmpty(result.records)) {
			return new Error('username or email address already in use');
		} else {
			return session.run('CREATE (user:User { id:{id}, username:{username}, email:{email}, password:{password}, following:0, date:{date} }) RETURN user', {
				id: uuid4(),
				username: username,
				email: email,
				password: encryptPassword(password),
				date: Date.now()
			})
			.then(result => {
				return result.records[0].get('user');
			})
			.catch(error => {
				console.log(error);
				throw new Error('could not create a new user');
			})
		}
	})
}


exports.getUsers = (session) => {
	return session.run('MATCH (u: User) RETURN u')
		.then(result => {
			if(!_.isEmpty(result.records)) {
				return result.records;
			}
		})
		.catch(error => {
			return error;
		});
}


