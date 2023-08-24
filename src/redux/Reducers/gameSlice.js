import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const selectRandomWord = createAsyncThunk(
  'game/selectRandomWord',
  async () => {
    // Replace this with your own logic for selecting a random word
    const words = ['apple', 'banana', 'orange'];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
);

const initialState = {
  word: '',
  guessedLetters: [],
  incorrectGuesses: 0,
  status: 'idle',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectRandomWord.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectRandomWord.fulfilled, (state, action) => {
        state.word = action.payload;
        state.status = 'idle';
      });
  },
});

export const { addGuessedLetter, resetGame } = gameSlice.actions;
export { selectRandomWord };
export default gameSlice.reducer;
