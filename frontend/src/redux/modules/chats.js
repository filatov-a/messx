import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config/config";
import {convertDate} from "../../utils/date";

export const sendGetAllChats = createAsyncThunk(
    'posts/sendGetAllPosts',
    async (param) => {
        try {
            const lim = 10;
            const url = `${config.url}/chats?limit=${lim}&offset=${lim*(param.page-1)}&title=${param.text}`;
            const res = await axios.get(url);

            convertDate(res.data);

            return {posts: res, page: param.page, count: res.data.count};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendDeleteChat = createAsyncThunk(
    'posts/sendDeletePost',
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${config.url}/caht/${id}`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetChatById = createAsyncThunk(
    'posts/sendGetPostById',
    async (param, thunkAPI) => {
        try {
            // let header = { headers: { Authorization: `Bearer ${param.token}`}}
            const chats = await axios.get(`${config.url}/chats/${param.id}`);
    
            return {cahts: chats};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
);

export const sendCreateChat = createAsyncThunk(
    'posts/sendCreatePost',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.post(`${config.url}/cahts/`, param.user, header);
            return {specChat: res.data};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetAllChatsFromUser = createAsyncThunk(
    'posts/sendCreatePost',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.get(`${config.url}/cahts/`, param.user, header);
            return {chats: res.data};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    chats: [],
    page: 1,
    specChat: null,
    error: null,
    status: 'idle',
    count: 1,
};

const slice = createSlice({
    name: 'chats',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [sendGetChatById.fulfilled]: (state, action) => {
            state.specPost = action.payload.post;
        },
        [sendCreateChat.fulfilled]: (state, action) => {
            state.error = action.payload.error
        },
        [sendDeleteChat.fulfilled]: (state, action) => {
            state.specChat = null;
            const tmp = [];
            state.posts.map(i=>{
                if (i.id !== action.payload.id){
                    tmp.push(i);
                }
            });
            state.posts = tmp;
        },
        [sendGetAllChats.fulfilled]: (state, action) => {
            state.chats = action.payload.posts;
            if (action.payload.page) state.page = action.payload.page;
            state.count = action.payload.count;
            state.specPost = null;
        },
        [sendGetAllChatsFromUser.fulfilled]: (state, action) => {
            state.chats = action.payload.posts;
            if (action.payload.page) state.page = action.payload.page;
            state.count = action.payload.count;
            state.specPost = null;
        },
    }
})
export default slice.reducer;
