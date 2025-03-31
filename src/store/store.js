import { configureStore } from '@reduxjs/toolkit';
import { languageSlice } from './language.slice';
import likesCounterSlice from './counter.slice';
import { saveState } from './localStorage';
import { logIt } from './middleware';

export const store = configureStore({
    reducer: {
        language: languageSlice,
        likes: likesCounterSlice
    },
    middleware: () => [logIt]
});

console.log(store.getState().language);

store.subscribe(() => {
    saveState({ name: store.getState().likes.counter }, 'likes');
});
