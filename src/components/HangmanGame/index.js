import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { guessLetter, newGame } from "../../Redux/Reducers/gameSlice";

const HangmanGame = () => {
    const dispatch = useDispatch();
    const {
        secretWord,
        guessedLetters,
        attemptsLeft, 
        gameStatus
    } = useSelector(state => state.game);

    const handleGuess = (letter) => {
        if (!guessedLetters.includes(letter)) {
            dispatch(guessLetter(letter));
        }
    };
}