import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGuessedLetter, resetGame, selectRandomWord } from "../../redux/Reducers/gameSlice";
import WordDisplay from "../WordDisplay";
import "./hangman-game-styles.scss";

const HangmanGame = () => {
    const dispatch = useDispatch();
    const word = useSelector((state) => state.game.word);
    const incorrectGuesses = useSelector((state) => state.game.incorrectGuesses);
    const guessedLetters = useSelector((state) => state.game.guessedLetters);

    const handleLetterClick = (letter) => {
        dispatch(addGuessedLetter(letter));
    };

    const handleResetClick = () => {
        dispatch(resetGame());
        dispatch(selectRandomWord());
    };

    const hasWon = word.split("").every((letter) => guessedLetters.includes(letter));
    const hasLost = incorrectGuesses >= 6;

    return (
        <div className="hangman-game">
            <h1 className="hangman-game__title">
                Hangman
            </h1>
            {hasWon && <p className="hangman-game__message"> Congratulations, you won!</p>}
            {hasLost && <p className="hangman-game__message"> Sorry, you lost. The word was: {word} </p>}
            {!hasWon && !hasLost && (
                <div className="hangman-game__content">
                    <WordDisplay />
                    <p className="hangman-game__info">
                        Incorrect guesses: {incorrectGuesses}
                    </p>
                    <p className="hangman-game__info">
                        Guessed letters: {guessedLetters.join(", ")}
                    </p>
                    <div className="hangman-game__buttons">
                        {[...'abcdefghijklmnopqrstuvwxyz'].map((letter) => (
                            <button
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                disabled={guessedLetters.includes(letter)}
                                className="hangman-game__button"
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <button onClick={handleResetClick} className="hangman-game__reset">
                Reset
            </button>
        </div>
    );
}

export default HangmanGame;