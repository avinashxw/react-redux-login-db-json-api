import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addUser = createAsyncThunk('user/add',async(userData) => {
    try {
        const response = await axios.post('http://localhost:3000/users', userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add user: ', error.message);  
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        error: null,
        status: 'idle',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.name = action.payload.name;
                state.email = action.payload.email;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});


export const { setName, setEmail } = userSlice.actions;

export default userSlice.reducer;