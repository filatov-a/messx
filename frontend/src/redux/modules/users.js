import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";

export const sendGetUserById = createAsyncThunk(
    'users/sendGetUserById',
    async (id, thunkAPI) => {
        try {
            if (!id) return null;
            const res = await axios.get(`/users/${id}`);
            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetAllUsers = createAsyncThunk(
    'users/sendGetAllUsers',
    async (param) => {
        try {
            const lim = 10
            const res = await axios.get(`/users?limit=${lim}&offset=${lim*(param.page-1)}`);
            return {users: res.data.users, count: res.data.count, page: param.page};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendDeleteUser = createAsyncThunk(
    'users/sendDeleteUser',
    async (id) => {
        try {
            await axios.delete(`/users/${id}`);
            return {success: "user deleted"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendCreateUser = createAsyncThunk(
    'users/sendCreateUser',
    async (param) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const user = await axios.post(`/users`, param.user, header);
            param.history.push(`/users/${user.data.id}`);
            return {success: "user created"};
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
            const res = await axios.post(`/users/avatar`, param.file, header);
            return {success: "set avatar", avatar: res.data};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendUpdate = createAsyncThunk(
    'users/sendUpdate',
    async (param, thunkAPI) => {
        try {
            const res = await axios.patch(`/users/${param.id}`, param.user);
            param.navigate(`/users/${param.id}`);
            return {success: "updated", user: res.data};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendLogin = createAsyncThunk(
    'users/sendLogin',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/login`, param.user);
            param.navigate('/');
            return {
                token: res.data.token,
                user: res.data.user,
                error: null,
                success: "login"
            };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendRegister = createAsyncThunk(
    'users/sendRegister',
    async (param, thunkAPI) => {
        try {
            await axios.post(`/register`, param.user);
            param.navigate('/login');
            return {error: null, success: "check your email"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendVerifyEmail = createAsyncThunk(
    'users/sendVerifyEmail',
    async (token, thunkAPI) => {
        try {
            await axios.get(`/verify-email/${token}`);
            return {success: "email is verified"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    users: [],
    specUser: null,
    error: null,
    success: null,
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
            state.success = "logout";
        },
        setAvatar: (state, action) => {
            state.user.profile_picture = action.payload;
        },
        clearMess: (state, action) => {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendGetAllUsers.fulfilled, (state, action) => {
            state.count = action.payload.count;
            state.page = action.payload.page;
            state.users = action.payload.users;
            state.specUser = null;
        })
        builder.addCase(sendGetUserById.fulfilled, (state, action) => {
            state.specUser = action.payload;
        })
        builder.addCase(sendDeleteUser.fulfilled, (state, action) => {
            state.specUser = null;
            state.users = null;
            state.success = "user deleted";
        })
        builder.addCase(sendCreateUser.fulfilled, (state, action) => {
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendSetAvatar.fulfilled, (state, action) => {
            state.specUser.profile_picture = action.payload;
            state.user.profile_picture = action.payload;
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendUpdate.fulfilled, (state, action) => {
            state.error = action.payload.error;
            if (action.payload.user) state.user = action.payload.user;
        })
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendRegister.fulfilled, (state, action) => {
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendVerifyEmail.fulfilled, (state, action) => {
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
    }
})

export default slice.reducer;
export const { logOut, setAvatar, clearMess } = slice.actions;
