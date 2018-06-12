
exports.follow = (session, userId, id) => {
	
	return session.run('MATCH (u:User { id:{userId} }), (m:User { id:{id} }) MERGE (u)-[f:FOLLOW]->(m) SET u.following = u.following + 1  RETURN u', {
		userId: userId,
		id: id
	})
	.then(result => {
		return result;
	})
	.catch(error => {
		return error;
	})
}