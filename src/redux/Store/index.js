import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../Reducers/gameSlice";

const store = configureStore({
    reducer: {
        game: gameReducer,
    },
});

export default store;