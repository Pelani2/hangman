import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../Reducers/gameSlice";
import hintReducer from "../Reducers/hintSlice";

const store = configureStore({
    reducer: {
        game: gameReducer,
        hint: hintReducer,
    },
});

export default store;