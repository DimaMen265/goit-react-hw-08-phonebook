import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const setAuthHeader = (token = null) => {
    if (!token) {
        axios.defaults.headers.common.Authorization = ``;
    } else {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    };
};

export const register = createAsyncThunk("auth/signup", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post("/users/signup", credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
        console.error(error.response.data)
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post("/users/login", credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post("/users/logout");
        setAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue("No user");
    };

    try {
        setAuthHeader(persistedToken);
        const response = await axios.get("/users/current");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    };
});