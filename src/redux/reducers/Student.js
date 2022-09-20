import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getStudent = createAsyncThunk('getStudent', async () => {
    return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
})

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        array: [],
        status: ''
    },
    extraReducers: {
        [getStudent.pending]: (state) => {
            state.status = 'panding'
        },
        [getStudent.fulfilled]: (state, { payload }) => {
            state.status = 'succes';
            state.array = payload;
        },
        [getStudent.rejected]: (state) => {
            state.status = 'failed'
        }
    }
})

export default studentSlice.reducer