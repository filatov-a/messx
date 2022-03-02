import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import config from "../../config/config";
import {convertDate} from "../../utils/date";
import addLike from "../utils/addLike";

export const sendGetAllPosts = createAsyncThunk(
    'posts/sendGetAllPosts',
    async (param) => {
        const lim = 5;
        const url = `/posts?limit=${lim}&offset=${lim*(param.page-1)}`;
        const header = { headers: { Authorization: `Bearer ${param.token}` }}
        const res = await axios.get(url, header);

        convertDate(res.data);

        return {posts: res.data.posts, page: param.page, count: res.data.count};
    }
)

export const sendGetAllDayPosts = createAsyncThunk(
    'posts/sendGetAllDayPosts',
    async (param) => {
        const lim = 5;
        const url = `/posts-day?limit=${lim}&offset=${lim*(param.page-1)}`;
        const header = { headers: { Authorization: `Bearer ${param.token}` }}
        const res = await axios.get(url, header);

        convertDate(res.data);

        return {posts: res.data.posts, page: param.page, count: res.data.count};
    }
)

export const sendGetUserPosts = createAsyncThunk(
    'posts/sendGetUserPosts',
    async (param) => {
        const lim = 5;
        const url = `/users/${param.id}/posts/?limit=${lim}&offset=${lim*(param.page-1)}`;
        const header = { headers: { Authorization: `Bearer ${param.token}` }}
        const res = await axios.get(url, header);

        convertDate(res.data);
        return res.data;
    }
)

export const sendGetAllPostsFromCategory = createAsyncThunk(
    'posts/sendGetAllPostsFromCategory',
    async (id) => {
        const res = await axios.get(`${config.url}/api/categories/${id}/posts`);
        convertDate(res.data);
        return res.data;
    }
)

export const sendDeletePost = createAsyncThunk(
    'posts/sendDeletePost',
    async (id, thunkAPI) => {
        const res = await axios.delete(`/posts/${id}`);
        return res.data;
    }
)

export const sendSetLike = createAsyncThunk(
    'posts/sendSetLike',
    async (param, thunkAPI) => {
        let header = { headers: { Authorization: `Bearer ${param.token}` }}
        let type = {type: param.type}
        const res = await axios.post(`/posts/${param.id}/like`, type, header);
        return {like: res.data, usersPosts: param.usersPosts};
    }
);

export const sendGetPostById = createAsyncThunk(
    'posts/sendGetPostById',
    async (param, thunkAPI) => {
        let header = { headers: { Authorization: `Bearer ${param.token}` }}
        const res = await axios.get(`/posts/${param.id}`, header);
        convertDate(res.data);
        convertDate(res.data.answers);
        convertDate(res.data.questions);
        return res.data;
    }
);

export const sendCreatePost = createAsyncThunk(
    'posts/sendCreatePost',
    async (param, thunkAPI) => {
        let header = { headers: { Authorization: `Bearer ${param.token}` }}
        const res = await axios.post(`/posts/`, param.post, header);
        if (!param.post.postId) param.navigate(`/posts/${res.data.id}`)
        return {post: res.data, depend: param.post.postId, success: "post created"};
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
        builder
            .addCase(sendGetUserPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(sendGetUserPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.status = 'succeeded'
            })
            .addCase(sendGetUserPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message //.response.data.error
            })
        builder.addCase(sendGetPostById.fulfilled, (state, action) => {
            state.specPost = action.payload;
            state.posts = [];
        })
        builder.addCase(sendCreatePost.fulfilled, (state, action) => {
            if (action.payload.depend)
                state.specPost.questions.unshift(action.payload.post)
            state.error = action.payload.error
            state.success = action.payload.success
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
            addLike(state.specPost?.questions, action.payload.like, "post");
            addLike(state.specPost?.answers, action.payload.like, "post");
        })
    }
})

export default slice.reducer;
