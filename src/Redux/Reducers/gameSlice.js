import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        secretWord: 'hangman',
        guessedLetters: [],
        attemptsLeft: 6,
        gameStatus: 'ongoing'
    },
    reducers: {
        guessLetter: (state, action) => {
            const guessedLetter = action.payload.toLowerCase();
            state.guessedLetters.push(guessedLetter);

            if (!state.secretWord.includes(guessedLetter)) {
                state.attemptsLeft -= 1;
            }

            if (state.attemptsLeft === 0) {
                state.gameStatus = 'lost';
            } else if (state.secretWord.split('').every(letter => state.guessedLetters.includes(letter))) {
                state.gameStatus = 'won';
            }
        },

        newGame: (state) => {
            state.secretWord = 'hangman';
            state.guessedLetters = [];
            state.attemptsLeft = 6;
            state.gameStatus = 'ongoing';
        },
    },
});

export const { guessLetter, newGame } = gameSlice.actions;
export default gameSlice.reducer;