export default function addLike(posts, like){
    if (!posts || !like) return;

    for (let i = 0; i < posts.length; i++){
        if (posts[i].id === like.like?.postId){
            posts[i].LikesPosts.push(like.like)
            if (like.like.type === 'like'){
                posts[i].likesCount++;
                posts[i].isLiked = true;
            }
            else {
                posts[i].dislikesCount++;
                posts[i].isDisliked = true;
            }
        }
        if (posts[i].id === like.dLike?.postId){
            posts[i].LikesPosts.splice(i, 1);
            if (like.dLike.type === 'like') {
                posts[i].likesCount--;
                posts[i].isLiked = false;
            }
            else {
                posts[i].dislikesCount--;
                posts[i].isDisliked = false;
            }
        }
    }
}