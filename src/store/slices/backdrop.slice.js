import { createSlice } from '@reduxjs/toolkit';

const backdropSlice = createSlice({
    name: 'snackbar',
    initialState: {
        open: false,
        message: '', 
    },
    reducers: {
        showBackdrop(state, action) {
            state.open = true;
            state.message = action.payload.message;
        },
        hideBackdrop(state, action) {
            state.open = false;
            state.message = '';
        },
    },
});

export const { showBackdrop, hideBackdrop } = backdropSlice.actions;

export default backdropSlice.reducer;
