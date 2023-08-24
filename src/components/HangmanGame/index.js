import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGuessedLetter, resetGame, selectRandomWord } from "../../redux/Reducers/gameSlice";
import WordDisplay from "../WordDisplay";

const HangmanGame = () => {
    const dispatch = useDispatch();
    const incorrectGuesses = useSelector((state) => state.game.incorrectGuesses);
    const guessedLetters = useSelector((state) => state.game.guessedLetters);
}