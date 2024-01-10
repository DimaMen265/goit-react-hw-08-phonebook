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

export const register = createAsyncThunk("auth/singup", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post("/users/singup", credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
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

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/contacts");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
    try {
        const response = await axios.post("/contacts", contact);
        return response.data.contact;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (taskId, thunkAPI) => {
    try {
        const response = await axios.delete(`/contacts/${taskId}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    };
});
