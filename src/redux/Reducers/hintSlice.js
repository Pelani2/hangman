import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectRandomWordAndMaxGuesses } from "./gameSlice";

export const requestHint = createAsyncThunk(
    "hint/requestHint",
    async (_, { getState }) => {
        const state = getState();
        const { word, maxGuesses, } = state.game;

        const randomIndex = Math.floor(Math.random() * maxGuesses);
        
        return word[randomIndex];
    },  
);

const initialState = {
    hint: "",
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
        },
    },
});

export default hintSlice.reducer;