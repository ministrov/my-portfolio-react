import { createSlice } from '@reduxjs/toolkit';
import i18n from '../utils/i18n';

const initialState = {
  currentLanguage: i18n.language || 'en',
};

export const languageSlice  = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggleLanguage: (state) => {
            // state.currentLanguage
        },
        setLanguage: (state, action) => {}
    }
});


export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
