const uuid = require('uuid/v4');

exports.addPost = (session, userId, imagePath, caption) => {

	return session.run('CREATE (post:Post {id:{id}, userId:{userId}, imagePath:{imagePath}, caption:{caption}, date: {date}}) RETURN post', {
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
		throw new Error(err);
	})
}