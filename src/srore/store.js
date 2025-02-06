import { configureStore } from '@reduxjs/toolkit';
import couterSlice from './counter.slice';

export const store = configureStore({
    reducer: {
        likes: couterSlice
    }
});

store.subscribe(() => {});
