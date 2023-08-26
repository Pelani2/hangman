import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGuessedLetter, resetGame, setDifficulty, startGame, setShowDifficulty, setShowContent, selectRandomWordAndMaxGuesses } from "../../redux/Reducers/gameSlice";
import WordDisplay from "../WordDisplay";
import Hint from "../Hint";
import { resetHint } from "../../redux/Reducers/hintSlice";
import "./hangman-game-styles.scss";

const HangmanGame = () => {
    const dispatch = useDispatch();

    const [timeLeft, setTimeLeft] = useState(60);

    const [isRunning, setIsRunning] = useState(false);

    const word = useSelector((state) => state.game.word);

    const incorrectGuesses = useSelector((state) => state.game.incorrectGuesses);

    const guessedLetters = useSelector((state) => state.game.guessedLetters);

    const maxIncorrectGuesses = useSelector((state) => state.game.maxIncorrectGuesses);

    const difficulty = useSelector((state) => state.game.difficulty);

    const playing = useSelector((state) => state.game.playing);

    const hasWon = word.split("").every((letter) => guessedLetters.includes(letter));

    const hasLost = incorrectGuesses >= maxIncorrectGuesses;

    const showDifficulty = useSelector((state) => state.game.showDifficulty);

    const showContent = useSelector((state) => state.game.showContent);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (timeLeft === 0) {
            alert(`Time is up. You lose. The word was ${word}`);
            setIsRunning(false);
        }
    }, [isRunning, timeLeft, dispatch, word]);

    const handleLetterClick = (letter) => {
        dispatch(addGuessedLetter(letter));
        if (hasWon || hasLost) {
            setIsRunning(false);
            setTimeLeft(60);
        }
    };

    const handleResetClick = () => {
        dispatch(resetGame());
        dispatch(selectRandomWordAndMaxGuesses());
        dispatch(resetHint());
        setIsRunning(false);
        setTimeLeft(60);
    };

    const handleDifficultyClick = (difficulty) => {
        dispatch(setDifficulty(difficulty));
        dispatch(setShowContent());
    };

    const handlePlayClick = () => {
        dispatch(startGame());
        dispatch(selectRandomWordAndMaxGuesses());
        dispatch(setShowDifficulty());
        setIsRunning(true);
    };

    return (
        <div className="hangman-game">
            <h1 className="hangman-game__title">
                Hangman
            </h1>

            <button onClick={handlePlayClick} className="hangman-game__play">
                Play
            </button>

            {showDifficulty && (
                <div className="hangman-game__difficulty easy">
                    <button onClick={() => handleDifficultyClick('easy')} className="easy">
                        Easy
                    </button>
                    <button onClick={() => handleDifficultyClick('medium')} className="medium">
                        Medium
                    </button>
                    <button onClick={() => handleDifficultyClick('hard')} className="hard">
                        Hard
                    </button>
                </div>
            )}
            
            {showContent && (
                <>
                    <p className="hangman-game__difficulty-level">
                        Difficulty: {difficulty}
                    </p>
                    {hasWon && <p className="hangman-game__message hangman-game__message--win"> Congratulations, you won!</p>}
                    {hasLost && <p className="hangman-game__message hangman-game__message--lose"> Sorry, you lost. The word was: {word} </p>}
                    {!hasWon && !hasLost && (
                        <div className="hangman-game__content">
                            <WordDisplay />
                            <p className="hangman-game__timer">
                                Time left: {timeLeft} seconds
                            </p>
                            <Hint />
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
                                        disabled={!playing || guessedLetters.includes(letter)}
                                        className="hangman-game__button"
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <button onClick={handleResetClick} disabled={!playing} className="hangman-game__reset">
                        Reset
                    </button>
                </>
            )}  
        </div>
    );
}

export default HangmanGame;