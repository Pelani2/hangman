import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import words from "../../utils/words";

const easyWords = words.filter((word) => word.length <= 6);
const mediumWords = words.filter((word) => word.length <= 10);
const hardWords = words.filter((word) => word.length >= 12);

// export const getMaxIncorrectGuesses = (state) => {
//     const difficulty = state.game.difficulty;
//     let maxIncorrectGuesses;
//     if (difficulty === 'easy') {
//       maxIncorrectGuesses = 8;
//     } else if (difficulty === 'medium') {
//       maxIncorrectGuesses = 6;
//     } else if (difficulty === 'hard') {
//       maxIncorrectGuesses = 4;
//     }
//     return maxIncorrectGuesses;
// };

// const selectRandomWord = createAsyncThunk(
//   'game/selectRandomWord',
//   async (_, { getState }) => {
//     const state = getState();
//     const difficulty = state.game.difficulty;
//     let words;
//     if (difficulty === 'easy') {
//       words = easyWords;
//     } else if (difficulty === 'medium') {
//       words = mediumWords;
//     } else if (difficulty === 'hard') {
//       words = hardWords;
//     }

//     const randomIndex = Math.floor(Math.random() * words.length);
//     return words[randomIndex];
//   },
// );

const selectRandomWordAndMaxGuesses = createAsyncThunk(
  'game/selectRandomWordAndMaxGuesses',
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

    let maxIncorrectGuesses;
    if (difficulty === 'easy') {
      maxIncorrectGuesses = 8;
    } else if (difficulty === 'medium') {
      maxIncorrectGuesses = 6;
    } else if (difficulty === 'hard') {
      maxIncorrectGuesses = 4;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    return { word: words[randomIndex], maxGuesses: maxIncorrectGuesses };
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
  showContent: false,
  maxIncorrectGuesses: 0,
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
      state.maxIncorrectGuesses = 0;
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
    setShowContent(state) {
      state.showContent = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectRandomWordAndMaxGuesses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectRandomWordAndMaxGuesses.fulfilled, (state, action) => {
        state.word = action.payload.word;
        state.maxIncorrectGuesses = action.payload.maxGuesses;
        state.status = 'idle';
      });
  },
});

export const { addGuessedLetter, resetGame, setDifficulty, startGame, stopGame, setShowDifficulty, setShowContent } = gameSlice.actions;
export { selectRandomWordAndMaxGuesses };
export default gameSlice.reducer;
