import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import config from "../../config/config";
import {convertDate} from "../../utils/date";
import addLike from "../utils/addLike";

export const sendGetAllPosts = createAsyncThunk(
    'posts/sendGetAllPosts',
    async (param) => {
        try {
            const lim = 10;
            const url = `/posts?limit=${lim}&offset=${lim*(param.page-1)}`;
            const header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.get(url, header);

            convertDate(res.data);

            return {posts: res.data.posts, page: param.page, count: res.data.count};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetUserPosts = createAsyncThunk(
    'posts/sendGetUserPosts',
    async (param) => {
        try {
            const url = `/users/${param.id}/posts`;
            const header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.get(url, header);

            convertDate(res.data);

            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetAllPostsFromCategory = createAsyncThunk(
    'posts/sendGetAllPostsFromCategory',
    async (id) => {
        try {
            const res = await axios.get(`${config.url}/api/categories/${id}/posts`);
            convertDate(res.data);
            return res.data;
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
            await axios.delete(`/comments/${id}`);
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
            const res = await axios.post(`/posts/${param.id}/like`, type, header);
            return {like: res.data, usersPosts: param.usersPosts};
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
            const res = await axios.post(`/comments/${param.id}/like`, type, header);
            return res.data;
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
            const res = await axios.get(`/posts/${param.id}`, header);
            convertDate(res.data);
            return res.data;
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
            const res = await axios.post(`/posts/`, param.user, header);
            param.navigate(`/posts/${res.data.id}`)
            return {error: null};
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
    error: null,
    status: 'idle',
    count: 1,
    search: '',
    newLike: null
};

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendGetPostById.fulfilled, (state, action) => {
            state.specPost = action.payload;
        })
        builder.addCase(sendGetUserPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        builder.addCase(sendCreatePost.fulfilled, (state, action) => {
            state.error = action.payload.error
        })
        builder.addCase(sendDeleteComment.fulfilled, (state, action) => {
            const tmp = [];
            state.comments.map(i=>{
                if (i.comment.id !== action.payload.id){
                    tmp.push(i);
                }
            });
            state.comments = tmp;
        })
        builder.addCase(sendDeletePost.fulfilled, (state, action) => {
            state.specPost = null;
            const tmp = [];
            state.posts.map(i=>{
                if (i.id !== action.payload.id){
                    tmp.push(i);
                }
            });
            state.posts = tmp;
        })
        builder.addCase(sendGetAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            if (action.payload.page) state.page = action.payload.page;
            state.count = action.payload.count;
        })
        builder.addCase(sendGetAllPostsFromCategory.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.count = action.payload.count;
            if (action.payload.page) state.page = action.payload.page;
        })
        builder.addCase(sendSetLike.fulfilled, (state, action) => {
            addLike(state.posts, action.payload.like);
            addLike(state.specPost, action.payload.like);
        })
        builder.addCase(sendSetLikeToComment.fulfilled, (state, action) => {
            state.comments = action.payload;
        })
        builder.addCase(sendCreateComment.fulfilled, (state, action) => {
            state.comments.push(action.payload.comment);
            state.error = action.payload.error;
        })
    }
})

export default slice.reducer;
