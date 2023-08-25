import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const resetHint = createAction("hint/resetHint");

export const requestHint = createAsyncThunk(
    "hint/requestHint",
    async (_, { getState }) => {
        const state = getState();
        const { word } = state.game; 
        const { hintUsed } = state.hint;

        if (hintUsed) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * word.length);

        return word[randomIndex];
    },  
);

const initialState = {
    hint: "",
    hintUsed: false,
};

const hintSlice = createSlice({
    name: "hint",
    initialState,
    extraReducers: {
        [requestHint.pending]: (state) => {
            state.hint = "";
        },
        [requestHint.fulfilled]: (state, action) => {
            state.hint = action.payload;
            state.hintUsed = true;
        },
        [resetHint]: (state) => {
            state.hint = "";
            state.hintUsed = false;
        }
    },
});

export default hintSlice.reducer;