import { configureStore } from '@reduxjs/toolkit';
import couterSlice from './counter.slice';
import { saveState } from './localStorage';

export const store = configureStore({
    reducer: {
        likes: couterSlice
    }
});

store.subscribe(() => {
    saveState({ name: store.getState().likes.counter }, 'likes');
});
