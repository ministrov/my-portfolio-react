import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLang: 'en',
  toggled: false,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.currentLang = state.currentLang === 'en' ? 'ru' : 'en';
      state.toggled = !state.toggled;
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
