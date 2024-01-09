import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://65985146668d248edf2471cf.mockapi.io";

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
        return response.data;
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
