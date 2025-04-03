import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language.slice';
import { logIt } from './middleware';

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
  middleware: () => [logIt],
});
