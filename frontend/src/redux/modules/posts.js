import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";
import {convertDate} from "../../utils/date";

export const sendGetAllPosts = createAsyncThunk(
    'posts/sendGetAllPosts',
    async (param) => {
        try {
            const lim = 10;
            const url = `${config.url}/api/posts?limit=${lim}&offset=${lim*(param.page-1)}&title=${param.text}`;
            const res = await axios.get(url);

            convertDate(res.data);

            let posts = []
            for (let i = 0; i < res.data.posts.length; i++){
                const id = res.data.posts[i].id;
                const post = res.data.posts[i];
                const resL = await axios.get(`${config.url}/api/posts/${id}/like`);
                const comments = await axios.get(`${config.url}/api/posts/${id}/comments`);
                const user = await axios.get(`${config.url}/api/users/${post.userId}`);
                let obj = {
                    post: post,
                    user: user.data,
                    votes: resL.data.likes.length-resL.data.dislikes.length,
                    answers: comments.data.length,
                }
                posts.push(obj)
            }
            let search = ''
            if (param.text) search = param.text;
            return {posts: posts, page: param.page, count: res.data.count, search: search};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetAllPostsFromCategory = createAsyncThunk(
    'posts/sendGetAllPosts',
    async (id) => {
        try {
            const res = await axios.get(`${config.url}/api/categories/${id}/posts`);
            convertDate(res.data);
            let posts = []
            for (let i = 0; i < res.data.length; i++){
                const id = res.data[i].id;
                const post = res.data[i];
                const resL = await axios.get(`${config.url}/api/posts/${id}/like`);
                const comments = await axios.get(`${config.url}/api/posts/${id}/comments`);
                const user = await axios.get(`${config.url}/api/users/${post.userId}`);

                let obj = {
                    post: post,
                    user: user.data,
                    votes: resL.data.likes.length-resL.data.dislikes.length,
                    answers: comments.data.length,
                }
                posts.push(obj)
            }
            return {posts};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendDeletePost = createAsyncThunk(
    'posts/sendDeletePost',
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${config.url}/api/posts/${id}`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendDeleteComment = createAsyncThunk(
    'posts/sendDeleteComment',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${config.url}/api/comments/${id}`);
            return {id: id};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendSetLike = createAsyncThunk(
    'posts/sendSetLike',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            let type = {type: param.type}
            const res = await axios.post(`${config.url}/api/posts/${param.id}/like`, type, header);
            let isLiked = false, isDisliked = false;
            if (param.decode !== null) {
                const L = await res.data.likes.find(i => i.userId === param.decode.id);
                if (L) isLiked = true;
                const D = await res.data.dislikes.find(i => i.userId === param.decode.id);
                if (D) isDisliked = true;
            }
            return {likes: res.data.likes, dislikes: res.data.dislikes, isLiked: isLiked, isDisliked: isDisliked};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
);

export const sendSetLikeToComment = createAsyncThunk(
    'posts/sendSetLikeToComment',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            let type = {type: param.type}
            await axios.post(`${config.url}/api/comments/${param.id}/like`, type, header);
            let comments = [];
            const res = await axios.get(`${config.url}/api/posts/${param.postId}/comments`);
            convertDate(res.data);

            for (let i = 0; i < res.data.length; i++){
                const com = res.data[i];
                const resL = await axios.get(`${config.url}/api/comments/${com.id}/likes`);
                const userComment = await axios.get(`${config.url}/api/users/${com.userId}`);
                let l = resL.data.likes;
                if (l.length === 0) l = [];
                let d = resL.data.dislikes;
                if (d.length === 0) d = [];

                let isLikedComment = false;
                let isDislikedComment = false;
                if (param.decode !== null) {
                    const L = await resL.data.likes.find(i => i.userId === param.decode.id);
                    if (L) isLikedComment = true;
                    const D = await resL.data.dislikes.find(i => i.userId === param.decode.id);
                    if (D) isDislikedComment = true;
                }

                const obj = {
                    comment: com,
                    likes: l,
                    dislikes: d,
                    isLiked: isLikedComment,
                    isDisliked: isDislikedComment,
                    user: userComment.data,
                }
                comments.push(obj);
            }
            return comments;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
);

export const sendGetPostById = createAsyncThunk(
    'posts/sendGetPostById',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const resPost = await axios.get(`${config.url}/api/posts/${param.id}`);
            const user = await axios.get(`${config.url}/api/users/${resPost.data.userId}`);
            const post = resPost.data;

            convertDate(post);
            const postLikes = await axios.get(`${config.url}/api/posts/${param.id}/like`);

            let comments = [];
            const res = await axios.get(`${config.url}/api/posts/${post.id}/comments`);
            convertDate(res.data);

            for (let i = 0; i < res.data.length; i++){
                const com = res.data[i];
                const resL = await axios.get(`${config.url}/api/comments/${com.id}/likes`);
                const userComment = await axios.get(`${config.url}/api/users/${com.userId}`);
                let l = resL.data.likes;
                if (l.length === 0) l = [];
                let d = resL.data.dislikes;
                if (d.length === 0) d = [];

                let isLikedComment = false;
                let isDislikedComment = false;
                if (param.decode !== null) {
                    const L = await resL.data.likes.find(i => i.userId === param.decode.id);
                    if (L) isLikedComment = true;
                    const D = await resL.data.dislikes.find(i => i.userId === param.decode.id);
                    if (D) isDislikedComment = true;
                }

                const obj = {
                    comment: com,
                    likes: l,
                    dislikes: d,
                    isLiked: isLikedComment,
                    isDisliked: isDislikedComment,
                    user: userComment.data,
                }
                comments.push(obj);
            }

            let isLiked = false, isDisliked = false;
            if (param.decode !== null) {
                const L = postLikes.data.likes.find(i => i.userId === param.decode.id);
                if (L) isLiked = true;
                const D = await postLikes.data.dislikes.find(i => i.userId === param.decode.id);
                if (D) isDisliked = true;
            }

            return {
                post: post,
                user: user.data,
                comments: comments,
                isLiked: isLiked,
                isDisliked: isDisliked,
                likes: postLikes.data.likes,
                dislikes: postLikes.data.dislikes,
            };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
);

export const sendCreatePost = createAsyncThunk(
    'posts/sendCreatePost',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.post(`${config.url}/api/posts/`, param.user, header);
            param.history.push(`/posts/${res.data.id}`)
            return {error: null};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetAllCategoriesFromPost = createAsyncThunk(
    'posts/sendGetAllCategoriesFromPost',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`${config.url}/api/posts/${id}/categories`);
            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendCreateComment = createAsyncThunk(
    'posts/sendCreateComment',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.post(`${config.url}/api/posts/${param.id}/comments`, param.user, header);
            const user = await axios.get(`${config.url}/api/users/${res.data.userId}`, param.user, header);
            convertDate(res.data);
            const obj = {
                comment: res.data,
                likes: [],
                dislikes: [],
                isLiked: false,
                isDisliked: false,
                user: user.data,
            }
            return {comment: obj, error: null};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    posts: [],
    page: 1,
    specPost: null,
    user: null,
    categories: [],
    comments: [],
    likes: [],
    dislikes: [],
    error: null,
    status: 'idle',
    isLiked: false,
    isDisliked: false,
    count: 1,
    search: '',
};

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [sendGetPostById.fulfilled]: (state, action) => {
            state.specPost = action.payload.post;
            state.user = action.payload.user;
            state.comments = action.payload.comments;
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
            state.isLiked = action.payload.isLiked;
            state.isDisliked = action.payload.isDisliked;
        },
        [sendCreatePost.fulfilled]: (state, action) => {
            state.error = action.payload.error
        },
        [sendDeleteComment.fulfilled]: (state, action) => {
            const tmp = [];
            state.comments.map(i=>{
                if (i.comment.id !== action.payload.id){
                    tmp.push(i);
                }
            });
            state.comments = tmp;
        },
        [sendDeletePost.fulfilled]: (state, action) => {
            state.specPost = null;
            const tmp = [];
            state.posts.map(i=>{
                if (i.id !== action.payload.id){
                    tmp.push(i);
                }
            });
            state.posts = tmp;
        },
        [sendGetAllPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.posts;
            state.search = action.payload.search;
            if (action.payload.page) state.page = action.payload.page;
            state.count = action.payload.count;
            state.specPost = null;
            state.comments = [];
            state.likes = [];
            state.dislikes = []
            state.isLiked = false;
            state.isDisliked = false;
        },
        [sendGetAllPostsFromCategory.fulfilled]: (state, action) => {
            state.search = action.payload.search;
            state.posts = action.payload.posts;
            state.count = action.payload.count;
            if (action.payload.page) state.page = action.payload.page;
        },
        [sendSetLike.fulfilled]: (state, action) => {
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
            state.isLiked = action.payload.isLiked;
            state.isDisliked = action.payload.isDisliked;
        },
        [sendSetLikeToComment.fulfilled]: (state, action) => {
            state.comments = action.payload;
        },
        [sendSetLikeToComment.fulfilled]: (state, action) => {
            state.comments = action.payload;
        },
        [sendGetAllCategoriesFromPost.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },
        [sendCreateComment.fulfilled]: (state, action) => {
            state.comments.push(action.payload.comment);
            state.error = action.payload.error;
        },
    }
})
export default slice.reducer;
