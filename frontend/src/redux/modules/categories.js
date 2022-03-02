import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../utils/axios";
import config from "../../config/config";

export const sendGetAllCategories = createAsyncThunk(
    'categories/sendCreatePost',
    async (param, thunkAPI) => {
        try {
            const res = await axios.get(`/posts-categories`);
            return {data: res.data.all, error: null};
        } catch (err) {
            return {error: err.response.data.error, data: []};
        }
    }
)

export const sendGetCategoryById = createAsyncThunk(
    'categories/sendGetCategoryById',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`/posts-categories/${id}`);
            return {data: res.data, error: null};
        } catch (err) {
            return {error: err.response.data.error, data: null};
        }
    }
)

export const sendDeleteCategory = createAsyncThunk(
    'categories/sendDeleteCategory',
    async (param, thunkAPI) => {
        try {
            const res = await axios.delete(`/posts-categories/${param.id}`);
            param.history.push('/categories');
            return {data: param.id, error: null};
        } catch (err) {
            return {error: err.response.data.error, data: null};
        }
    }
)

export const sendCreateCategory = createAsyncThunk(
    'categories/sendDeleteCategory',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/posts-categories/`, param.user);
            param.navigate(`/categories`)
            return {data: res.data, error: null};
        } catch (err) {
            return {error: err.response.data.error, data: null};
        }
    }
)

const initialState = {
    categories: [],
    posts: [],
    specCategory: null,
    error: null,
    status: 'idle',
};

const slice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [sendGetAllCategories.fulfilled]: (state, action) => {
            state.categories = action.payload.data;
            state.error = action.payload.error;
        },
        [sendGetCategoryById.fulfilled]: (state, action) => {
            state.specCategory = action.payload.data;
            state.error = action.payload.error;
        },
        [sendDeleteCategory.fulfilled]: (state, action) => {
            state.specCategory = null;
            const tmp = [];
            state.categories.map( i=> {
                if (i.id !== action.payload.id){
                    tmp.push(i);
                }
            });
            state.categories = tmp;
        },
        [sendDeleteCategory.fulfilled]: (state, action) => {
            // if (action.payload.data !== null)
            //     state.categories.push(action.payload.data);
            state.error = action.payload.error;
        },
    }
})
export default slice.reducer;
