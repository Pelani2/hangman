import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectRandomWordAndMaxGuesses } from "./gameSlice";

export const requestHint = createAsyncThunk(
    "hint/requestHint",
    async (_, { getState }) => {
        const state = getState();
        const { word, maxGuesses, } = state.game;
    },  
);