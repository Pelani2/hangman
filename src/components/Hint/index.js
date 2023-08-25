import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestHint } from "../../redux/Reducers/hintSlice";
import "./hint-styles.scss";

const Hint = () => {
    const dispatch = useDispatch();
    const hint = useSelector((state) => state.hint.hint);
    const hintUsed = useSelector((state) => state.hint.hintUsed);

    const handleHintClick = () => {
        dispatch(requestHint());
    };

    return (
        <button onClick={handleHintClick} className="hangman-game__hint" disabled={hintUsed}>
            {hint || "Hint"}
        </button>
    );
};

export default Hint;