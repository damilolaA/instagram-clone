
exports.registerUser = (session, username, password) => {
	return session.run('MATCH (user:User {username: {username}}) RETURN user', {username:username})
		.then(result => {
			console.log(result.records.length);
			if(result.records.length) {
				console.log('i got into the check');
				throw {username: 'username already in use', status: 400}
			} else {
				return session.run('CREATE (user:User {username:{username}, password:{password}}) RETURN user', {
					username: username,
					password: password
				})
				.then(result => {
					console.log('i got into success');
					return result.records[0].get('user');
				})
				.catch(error => {
					throw new Error(error);
				})
			}
		})
}