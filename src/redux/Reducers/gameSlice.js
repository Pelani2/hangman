import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import words from "../../utils/words";

const easyWords = words.filter((word) => word.length <= 6);
const mediumWords = words.filter((word) => word.length <= 10);
const hardWords = words.filter((word) => word.length >= 12);

export const getMaxIncorrectGuesses = (state) => {
    const difficulty = state.game.difficulty;
    let maxIncorrectGuesses;
    if (difficulty === 'easy') {
      maxIncorrectGuesses = 8;
    } else if (difficulty === 'medium') {
      maxIncorrectGuesses = 6;
    } else if (difficulty === 'hard') {
      maxIncorrectGuesses = 4;
    }
    return maxIncorrectGuesses;
};

const selectRandomWord = createAsyncThunk(
  'game/selectRandomWord',
  async (_, { getState }) => {
    const state = getState();
    const difficulty = state.game.difficulty;
    let words;
    if (difficulty === 'easy') {
      words = easyWords;
    } else if (difficulty === 'medium') {
      words = mediumWords;
    } else if (difficulty === 'hard') {
      words = hardWords;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  },
);

const initialState = {
  word: '',
  guessedLetters: [],
  incorrectGuesses: 0,
  status: 'idle',
  difficulty: 'easy',
  playing: false,
  showDifficulty: false,
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
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    startGame(state) {
      state.playing = true;
    },
    stopGame(state) {
      state.playing = false;
    },
    setShowDifficulty(state) {
      state.showDifficulty = true;
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

export const { addGuessedLetter, resetGame, setDifficulty, startGame, stopGame, setShowDifficulty } = gameSlice.actions;
export { selectRandomWord };
export default gameSlice.reducer;
