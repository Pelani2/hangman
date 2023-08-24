import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    word: '',
    guessedLetters: [],
    incorrectGuesses: 0,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setWord(state, action) {
            state.word = action.payload;
        },
        addGuessedLetter(state, action) {
            state.guessedLetters.push(action.payload);
            if (!state.word.includes(action.payload)) {
                state.incorrectGuesses += 1;
            }
        },
        resetGame(state) {
            state.word = '';
            state.guessedLetters = [];
            state.incorrectGuesses = 0;
        },
    },
});

export const { setWord, addGuessedLetter, resetGame } = gameSlice.actions;
export default gameSlice.reducer;