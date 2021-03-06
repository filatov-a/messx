import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import {parseToken} from "../../utils/parseToken";
import register from "../../components/auth/register";

export const sendGetUserById = createAsyncThunk(
    'users/sendGetUserById',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.get(`/users/${param.id}`, header);
            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendGetUser = createAsyncThunk(
    'users/sendGetUser',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.get(`/users/${param.id}`, header);
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
            return {success: "Updated", user: res.data.user, updateData: res.data.updateData};
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
            localStorage.setItem('token', res.data.token)
            return {
                token: localStorage.getItem('token'),
                user: res.data.user,
                error: null,
                success: "login"
            };
        } catch (err) {
            console.log(err.response.data.error)
            return {error: err.response.data.error};
        }
    }
)

export const sendRegister = createAsyncThunk(
    'users/sendRegister',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/register`, {...param});
            return {data: res.data, success: "You have to save this info"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendRegisterVerify = createAsyncThunk(
    'users/sendVerifyEmail',
    async (params, thunkAPI) => {
        try {
            await axios.get(`/register-verify/${params.token}`);
            params.navigate("/login")
            return {success: "email is verified"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendFollowUser = createAsyncThunk(
    'users/sendFollowUser',
    async (param) => {
        let header = { headers: { Authorization: `Bearer ${param.token}` }}
        const follow = await axios.post(`/users/${param.id}/follow`, null, header);
        return {follow: follow.data.follow, dFollow: follow.data.dFollow};
    }
)

const initialState = {
    users: [],
    specUser: null,
    error: null,
    success: null,
    status: 'idle',
    token: localStorage.getItem('token'),
    user: null,
    count: 1,
    page: 1,
    updateData: null,
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.success = "logout";
            action.payload.ws.close();
            localStorage.removeItem('token');
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
        builder.addCase(sendGetUser.fulfilled, (state, action) => {
            const token = parseToken(state.token);
            if (Date.now() >= token.exp * 1000){
                state.user = null;
                state.users = [];
                state.specUser = null;
                state.token = null;
                localStorage.removeItem('token');
            } else {
                state.user = action.payload;
            }
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
            state.success = action.payload.success;
            state.user = action.payload.user;
            state.updateData = action.payload.updateData;
        })
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendRegister.fulfilled, (state, action) => {
            state.updateData = action.payload.data;
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendRegisterVerify.fulfilled, (state, action) => {
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendFollowUser.fulfilled, (state, action) => {
            const {follow, dFollow} = action.payload;
            if (follow){
                state.specUser.followers.unshift(follow)
                state.specUser.userFollower = true;
            } else {
                state.specUser.followers = state.specUser.followers.filter(x => {
                    return x.id !== dFollow.id;
                })
                state.specUser.userFollower = false;
            }
        })
    }
})

export default slice.reducer;
export const { logOut, setAvatar, clearMess, successMess } = slice.actions;
