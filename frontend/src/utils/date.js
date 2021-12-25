export const convertDate = (posts) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };

    if (!posts.length) {
        let date = new Date(posts.createdAt)
        posts.createdAt = date.toLocaleString("en-US", options);
    } else {
        for (let i = 0; i < posts.length; i++) {
            let date = new Date(posts[i].createdAt)
            posts[i].createdAt = date.toLocaleString("en-US", options);
        }
    }
}