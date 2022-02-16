export default function addLike(posts, like){
    if (!posts || !like) return;

    if (!posts.length){
        setLike(posts, like)
        return;
    }

    for (let i = 0; i < posts.length; i++){
        setLike(posts[i], like)
    }
}

function setLike(post, like){
    if (like.like && post.id === like.like?.postId){
        if (like.like.type === 'like'){
            post.likesCount++;
            post.isLiked = true;
        }
        else {
            post.dislikesCount++;
            post.isDisliked = true;
        }
    }
    if (like.dLike && post.id === like.dLike?.postId){
        if (like.dLike?.type === 'like') {
            post.likesCount--;
            post.isLiked = false;
        }
        else {
            post.dislikesCount--;
            post.isDisliked = false;
        }
    }
}