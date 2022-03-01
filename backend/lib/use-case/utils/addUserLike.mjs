export function addUserLike(posts, context){
	if (!posts) return;
	if (!posts.length){
		addToPost(posts, context);
	}
	else for (let i = 0; i < posts.length; i++){
		addToPost(posts[i], context);
	}
}

function addToPost(post, context){
	for (let j = 0; j < post.LikesPosts.length; j++){
		if (post.LikesPosts[j].userId === context.userId){
			post.dataValues.userLike = post.LikesPosts[j];
		}
	}
}