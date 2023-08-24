import React from "react";
import { useSelector } from "react-redux";

const WordDisplay = () => {
    const word = useSelector((state) => state.game.word);
    const guessedLetters = useSelector((state) => state.game.guessedLetters);

    return (
        <div className="word-display">
            {word.split('').map((letter) => (
                <span key={letter}>
                    {guessedLetters.includes(letter) ? letter : "_"}
                </span>
            ))}
        </div>
    );
};

export default WordDisplay;