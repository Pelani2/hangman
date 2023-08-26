import React from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp, onExpire }) => {
    const {
        seconds, 
        minutes, 
        start,
        pause, 
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire });

    return (
        <div>
            <div>
                <span>
                    {minutes}
                </span>
                <span>
                    {seconds}
                </span>
            </div>
            <button onClick={start}>
                Start
            </button>
            <button onClick={pause}>
                Pause
            </button>
            <button onClick={resume}>
                Resume
            </button>
            <button onClick={() => restart(expiryTimestamp)}>
                Restart
            </button>
        </div>
    )
};

export default Timer;