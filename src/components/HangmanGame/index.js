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

    const handleGuess = (input) => {
        const letter = input.toLowerCase();
        if (letter.length === 1 && /^[a-z]$/.test(letter) && !guessedLetters.includes(letter)) {
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
            <div className="hangman__attempts-left">
                Left: {attemptsLeft}
            </div>
            <div className="hangman__guessed-letters">
                Guessed letters: {guessedLetters.join(', ')}
            </div>
            <div>
                {secretWord.split('').map((letter, index) => (
                    <span key={index} style={{ marginRight: '5px' }}>
                        {guessedLetters.includes(letter) ? letter : '_'}
                    </span>
                ))}
            </div>
            <div className="hangman__game-status">
                {gameStatus === 'ongoing' && (
                    <div>
                        <input type="text" maxLength="1" onChange={(e) => handleGuess(e.target.value)} />
                        <button className="hangman__button-new-game" onClick={handleNewGame}>
                            New Game
                        </button>
                    </div>
                )}
                {gameStatus === 'won' && <div> You won! </div>}
                {gameStatus === 'lost' && <div> You lost! The word was {secretWord} </div>}
            </div>
        </div>
    );
}

export default HangmanGame;