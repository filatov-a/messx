import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config/config";

export const sendGetUserById = createAsyncThunk(
    'users/sendGetUserById',
    async (id, thunkAPI) => {
        try {
            if (!id) return null;
            const res = await axios.get(`${config.url}/api/users/${id}`);
            return res.data;
        } catch (err) {

        }
    }
)

export const sendGetAllUsers = createAsyncThunk(
    'users/sendGetAllUsers',
    async (param) => {
        try {
            const lim = 10
            const res = await axios.get(`${config.url}/api/users?limit=${lim}&offset=${lim*(param.page-1)}`);
            return {users: res.data.users, count: res.data.count, page: param.page};
        } catch (err) {
            console.log(err);
        }
    }
)

export const sendDeleteUser = createAsyncThunk(
    'users/sendDeleteUser',
    async (id) => {
        try {
            await axios.delete(`${config.url}/api/users/${id}`);
        } catch (err) {

        }
    }
)

export const sendCreateUser = createAsyncThunk(
    'users/sendDeleteUser',
    async (param) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const user = await axios.post(`${config.url}/api/users`, param.user, header);
            param.history.push(`/users/${user.data.id}`);
            return {error: null};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendSetAvatar = createAsyncThunk(
    'users/sendSetAvatar',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.post(`${config.url}/api/users/avatar`, param.file, header);
            return res.data;
        } catch (err) {

        }
    }
)

export const sendUpdate = createAsyncThunk(
    'users/sendUpdate',
    async (param, thunkAPI) => {
        try {
            const res = await axios.patch(`${config.url}/api/users/${param.id}`, param.user);
            param.history.push(`/users/${param.id}`);
            return {error: null, user: res.data};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendLogin = createAsyncThunk(
    'users/sendLogin',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`${config.url}/api/auth/login`, param.user);
            param.history.push('/');
            return {token: res.data.token,
                user: res.data.user,
                error: null};
        } catch (err) {
            return {token: null, user: null, error: err.response.data.error};
        }
    }
)

export const sendRegister = createAsyncThunk(
    'users/sendRegister',
    async (param, thunkAPI) => {
        try {
            await axios.post(`${config.url}/api/auth/register`, param.user);
            param.history.push('/login');
            return {error: null};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendVerifyEmail = createAsyncThunk(
    'users/sendVerifyEmail',
    async (token, thunkAPI) => {
        try {
            await axios.get(`${config.url}/api/auth/register/verify-email/${token}`);
            return {error: null};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    users: [],
    specUser: null,
    error: null,
    status: 'idle',
    token: null,
    user: null,
    count: 1,
    page: 1,
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setAvatar: (state, action) => {
            state.user.profile_picture = action.payload;
        },
        clearError: (state, action) => {
            state.error = null;
        },
    },
    extraReducers: {
        [sendGetAllUsers.fulfilled]: (state, action) => {
            state.count = action.payload.count;
            state.page = action.payload.page;
            state.users = action.payload.users;
            state.specUser = null;
        },
        [sendGetUserById.fulfilled]: (state, action) => {
            state.specUser = action.payload;
        },
        [sendDeleteUser.fulfilled]: (state, action) => {
            state.specUser = null;
            state.users = null;
        },
        [sendCreateUser.fulfilled]: (state, action) => {
            state.error = action.payload.error;
        },
        [sendSetAvatar.fulfilled]: (state, action) => {
            state.specUser.profile_picture = action.payload;
            state.user.profile_picture = action.payload;
        },
        [sendUpdate.fulfilled]: (state, action) => {
            state.error = action.payload.error;
            if (action.payload.user) state.user = action.payload.user;
        },
        [sendLogin.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = action.payload.error;
        },
        [sendRegister.fulfilled]: (state, action) => {
            state.error = action.payload.error;
        },
        [sendVerifyEmail.fulfilled]: (state, action) => {
            state.error = action.payload.error;
        },
    }
})

export default slice.reducer;
export const { logOut, setAvatar, clearError } = slice.actions;
