export default function addLike(arr, like, f){
    if (!arr || !like) return;

    if (!arr.length){
        setLike(arr, like, f)
        return;
    }

    for (let i = 0; i < arr.length; i++){
        setLike(arr[i], like, f)
    }
}

function setLike(post, like, f){
    if (like.like && post.id === like.like[`${f}Id`]){
        console.log(111)
        if (like.like.type === 'like'){
            post.likesCount++;
            post.isLiked = true;
        }
        else {
            post.dislikesCount++;
            post.isDisliked = true;
        }
    }
    if (like.dLike && post.id === like.dLike[`${f}Id`]){
        console.log(222)
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