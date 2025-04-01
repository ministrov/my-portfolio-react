import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'en',
  toggled: false
};

export const languageSlice  = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggleLanguage: (state) => {
            state.currentLanguage = state.currentLanguage === 'en' ? 'ru' : 'en';
            state.toggled = !state.toggled;
        }
    }
});


export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
