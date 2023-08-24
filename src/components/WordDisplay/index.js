import React from "react";
import { useSelector } from "react-redux";
import "./word-display-styles.scss";

const WordDisplay = () => {
    const word = useSelector((state) => state.game.word);
    const guessedLetters = useSelector((state) => state.game.guessedLetters);

    return (
        <div className="word-display">
            {word.split('').map((letter) => (
                <span key={letter} className="word-display__letter">
                    {guessedLetters.includes(letter) ? letter : "_"}
                </span>
            ))}
        </div>
    );
};

export default WordDisplay;