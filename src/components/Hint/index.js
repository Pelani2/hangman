import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./hint-styles.scss";

const Hint = () => {
    const dispatch = useDispatch();

    const hint = useSelector((state) => state.hint.hint);

    const handleHintClick = () => {
        dispatch(requestHint());
    };

    return (
        <button onClick={handleHintClick} className="hangman-game__hint">
            {hint || "Hint"}
        </button>
    );
};

export default Hint;