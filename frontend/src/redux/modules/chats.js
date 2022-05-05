import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config/config";
import {convertDate} from "../../utils/date";

export const sendGetAllChats = createAsyncThunk(
    'chats/sendGetAllChats',
    async (param) => {
        try {
            const lim = 10;
            let header = { headers: { Authorization: `Bearer ${param.token}`}}
            // const url = `${config.url}/chats?limit=${lim}&offset=${lim*(param.page-1)}`;
            const url = `${config.url}/chats`;
            const res = await axios.get(url, header);

            convertDate(res.data);

            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendDeleteChat = createAsyncThunk(
    'chats/sendDeleteChat',
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
    'chats/sendGetChatById',
    async (param, thunkAPI) => {
        try {
            // let header = { headers: { Authorization: `Bearer ${param.token}`}}
            const chats = await axios.get(`${config.url}/chats/${param.id}`);
            convertDate(chats.data);
            convertDate(chats.data.Messages);
            return chats.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
);

export const sendCreateChat = createAsyncThunk(
    'chats/sendCreateChat',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.post(`${config.url}/chats/`, param.chat, header);
            return {specChat: res.data};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
);

export const sendMessage = createAsyncThunk(
    'chats/sendMessage',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`${config.url}/messages`, param.message);
            convertDate(res.data);
            param.ws.send(JSON.stringify(res.data));
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
    reducers: {
        addMessage: (state, action) => {
            state.specChat?.Messages.unshift({...action.payload});
        },
    },
    extraReducers: {
        [sendMessage.fulfilled]: (state, action) => {
            state.error = null;
        },
        [sendGetChatById.fulfilled]: (state, action) => {
            state.specChat = action.payload;
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
            state.chats = action.payload;
        },
    }
})

export default slice.reducer;
export const { addMessage } = slice.actions;