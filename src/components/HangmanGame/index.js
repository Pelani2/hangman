import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGuessedLetter, resetGame, selectRandomWord } from "../../redux/Reducers/gameSlice";
import WordDisplay from "../WordDisplay";

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
        <div>
            <h1>
                Hangman
            </h1>
            {hasWon && <p> Congratulations, you won!</p>}
            {hasLost && <p> Sorry, you lost. The word was: {word} </p>}
            {!hasWon && !hasLost && (
                <div>
                    <WordDisplay />
                    <p>
                        Incorrect guesses: {incorrectGuesses}
                    </p>
                    <p>
                        Guessed letters: {guessedLetters.join(", ")}
                    </p>
                    <div>
                        {[...'abcdefghijklmnopqrstuvwxyz'].map((letter) => (
                            <button
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                disabled={guessedLetters.includes(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <button onClick={handleResetClick}>
                Reset
            </button>
        </div>
    );
}

export default HangmanGame;