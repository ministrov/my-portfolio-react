import { configureStore } from '@reduxjs/toolkit';
import couterSlice from './counter.slice';

export const store = configureStore({
    reducer: {
        counter: couterSlice
    }
});

// console.log(store.getState());