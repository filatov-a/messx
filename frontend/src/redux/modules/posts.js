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

export const sendGetAllDayPosts = createAsyncThunk(
    'posts/sendGetAllDayPosts',
    async (param) => {
        try {
            const lim = 10;
            const url = `/posts-day?limit=${lim}&offset=${lim*(param.page-1)}`;
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
            const res = await axios.delete(`/posts/${id}`);
            return res.data;
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

export const sendGetPostById = createAsyncThunk(
    'posts/sendGetPostById',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.get(`/posts/${param.id}`, header);
            convertDate(res.data);
            convertDate(res.data.answers);
            convertDate(res.data.questions);
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
            const res = await axios.post(`/posts/`, param.post, header);
            param.navigate(`/posts/${res.data.id}`)
            return {success: "post created"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    posts: [],
    page: 1,
    specPost: null,
    error: null,
    success: null,
    status: 'idle',
    count: 1,
    search: '',
};

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendGetPostById.fulfilled, (state, action) => {
            state.specPost = action.payload;
            state.posts = [];
        })
        builder.addCase(sendGetUserPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        builder.addCase(sendCreatePost.fulfilled, (state, action) => {
            state.error = action.payload.error
        })
        builder.addCase(sendDeletePost.fulfilled, (state, action) => {
            state.specPost = null;
            let tmp = [];
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
        builder.addCase(sendGetAllDayPosts.fulfilled, (state, action) => {
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
            addLike(state.posts, action.payload.like, "post");
            addLike(state.specPost, action.payload.like, "post");
        })
    }
})

export default slice.reducer;
