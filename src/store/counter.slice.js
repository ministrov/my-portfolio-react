import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './localStorage';

const initialState = {
    counter: loadState('likes')?.name || 0
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