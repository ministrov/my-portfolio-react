import { createSlice } from '@reduxjs/toolkit';
// import i18n from '../utils/i18n';

const initialState = {
  currentLanguage: 'en',
};

export const languageSlice  = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggleLanguage: (state, action) => {
            state.currentLanguage = action.payload
        }
        // setLanguage: (state, action) => {}
    }
});


export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
