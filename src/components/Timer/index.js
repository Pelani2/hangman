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
};

export default Timer;