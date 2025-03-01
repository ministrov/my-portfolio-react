import { configureStore } from '@reduxjs/toolkit';
import couterSlice from './counter.slice';
import { saveState } from './localStorage';
import { logIt } from './middleware';

export const store = configureStore({
    reducer: {
        likes: couterSlice
    },
    middleware: () => [logIt]
});

store.subscribe(() => {
    saveState({ name: store.getState().likes.counter }, 'likes');
});
