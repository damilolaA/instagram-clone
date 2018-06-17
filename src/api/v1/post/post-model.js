const uuid = require('uuid/v4');

exports.addPost = (session, userId, imagePath, caption) => {
	return session.run('CREATE (post:Post {id:{id}, userId:{userId}, imagePath:{imagePath}, caption:{caption}, date:{date}, likes:0}) RETURN post', {
		id: uuid(),
		userId: userId,
		imagePath: imagePath,
		caption: caption,
		date: Date.now()
	})
	.then(post => {
		return post.records[0].get('post');
	})
	.catch(err => {
		return err;
	})
}

exports.getPost = (session, userId) => {
	return session.run('MATCH (post:Post) WHERE post.userId={userId} RETURN post', {
		userId: userId
	})
	.then(result => {
		return result.records;
	})
	.catch(err => {
		return new Error(err);
	})
}

exports.addComment = (session, postId, comment, userId) => {
	return session.run('MATCH (u:User {id: {userId}}), (p:Post {id: {postId}}) CREATE (u)-[c:Comments {comment: {comment}, user:{userId}}]->(p) RETURN c', {
		postId: postId,
		comment: comment,
		userId: userId,
		user: userId
	})
		.then(result => {
			return result;
		})
		.catch(error => {
			return error;
		})
}

exports.likePost = (session, postId, userId) => {
	return session.run('MATCH (p:Post {id:{postId}}), (u:User {id:{userId}}) CREATE (u)-[l:LIKES]->(p) SET p.likes = p.likes + 1 RETURN p', {
		postId: postId,
		userId: userId
	})
	.then(result => {
		return result;
	})
	.catch(error => {
		return error;
	})
}