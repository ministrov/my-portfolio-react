import { configureStore } from '@reduxjs/toolkit';
import likesCounterSlice from './counter.slice';
import { saveState } from './localStorage';
import { logIt } from './middleware';

export const store = configureStore({
    reducer: {
        likes: likesCounterSlice
    },
    middleware: () => [logIt]
});

store.subscribe(() => {
    saveState({ name: store.getState().likes.counter }, 'likes');
});
