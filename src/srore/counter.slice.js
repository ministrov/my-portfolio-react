import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counter: 0
};

export const couterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {}
});

export default couterSlice.reducer;