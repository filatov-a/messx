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
        post.LikesPosts.unshift(like.like)
        post.userLike = like.like;
        post.isLiked = true;
    }
    if (like.dLike && post.id === like.dLike[`${f}Id`]){
        let newL = [];
        post.LikesPosts.map(i => {
            if (i.id !== like.dLike.id)
                newL.push(i);
        })
        post.LikesPosts = newL;
        post.userLike = undefined;
    }
}