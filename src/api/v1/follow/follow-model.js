const number = 0;

exports.follow = (session, userId, id) => {
	let number = number++;
	console.log(number);
	
	return session.run(`MATCH (u:User { id:{userId} }) (m:User { id:{id} }) CREATE (u)-[:FOLLOW]->m 
		SET u.following = {number} RETURN u`, {
		userId: userId,
		id: id,
		number: number
	})
	.then(result => {
		return result;
	})
	.catch(error => {
		return error;
	})
}