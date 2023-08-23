import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { guessLetter, newGame } from "../../redux/Reducers/gameSlice.js";

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

    const handleNewGame = () => {
        dispatch(newGame());
    };

    return (
        <div className="hangman__container">
            <h1>
                Hangman
            </h1>
            <div className="hangman__secret-word">
                Secret word: {secretWord}
            </div>
            <div className="hangman__attempts-left">
                Left: {attemptsLeft}
            </div>
            <div className="hangman__guessed-letters">
                Guessed letters: {guessedLetters.join(', ')}
            </div>
            <div>

            </div>
        </div>
    );
}

export default HangmanGame;