const uuid = require('uuid/v4');

exports.addPost = (session, user, image, caption) => {

	return session.run('CREATE (post:Post {id:{id}, user:{user}, image:{image}, caption:{caption}, date: {date}}) RETURN USER', {
		id: uuid(),
		user: user,
		image: image,
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