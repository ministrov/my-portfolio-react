import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counter: 0
};

export const likesCounterSlice  = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        incrementLike: (state) => {
            state.counter += 1;
        },
        decrementLike: (state) => {
            state.counter -= 1;
        },
    }
});

export const { incrementLike, decrementLike } = likesCounterSlice.actions;
export default likesCounterSlice.reducer;