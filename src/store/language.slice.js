import { createSlice } from '@reduxjs/toolkit';

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
    }
});


export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
