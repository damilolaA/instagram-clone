const uuid = require('uuid/v4');

exports.addPost = (session, userId, imagePath, caption) => {

	return session.run('CREATE (post:Post {id:{id}, userId:{userId}, imagePath:{imagePath}, caption:{caption}, comments:[], date: {date}}) RETURN post', {
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
		return new Error(err);
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

	return session.run("MATCH (p:Post) WHERE p.id={postId} SET p.comments=p.comments + '[{ comment:{{comment}}, userId:{{userId}} }]' RETURN p", {
		postId: postId,
		comment: comment,
		userId: userId
	})
		.then(result => {
			return result;
		})
		.catch(error => {
			return error;
		})
}