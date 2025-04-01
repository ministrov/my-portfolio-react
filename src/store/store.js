import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language.slice';
import likesCounterReducer from './counter.slice';
import { saveState } from './localStorage';
import { logIt } from './middleware';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        likes: likesCounterReducer
    },
    middleware: () => [logIt]
});

store.subscribe(() => {
    saveState({ name: store.getState().likes.counter }, 'likes');
});
