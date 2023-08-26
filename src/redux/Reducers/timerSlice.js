import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expiryTimestamp: 0,
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setExpiryTimestamp(state, action) {
            state.expiryTimestamp = action.payload;
        },
    },
});

export const { setExpiryTimestamp } = timerSlice.actions;
export default timerSlice.reducer;