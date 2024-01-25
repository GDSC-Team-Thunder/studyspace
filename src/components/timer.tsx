import { useState, useEffect } from "react";

const Timer = () => {
    const [total, setTotal] = useState(1500);
    const [time, setTime] = useState("25:00");
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(() => {
                setTotal(prevTotal => (prevTotal > 0 ? prevTotal - 1 : prevTotal));
                }, 1000);
        
                updateTimer();
                return () => clearInterval(intervalId);
        }

    }, [isRunning, total]);

    const handleButtonClick = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
      };

    const getTimeRemaining = () => {
        var temp = total;

        const hours = Math.floor(temp / 3600);
        temp %= 3600;
        const minutes = Math.floor(temp / 60);
        const seconds = temp % 60;

        return {
            hours,
            minutes,
            seconds,
        };
    };
 
    const updateTimer = () => {
        let { hours, minutes, seconds } =
            getTimeRemaining();

        if ((total >= 0) && (hours != 0)) {
            setTime(
                (minutes > 9 ? String(minutes) : "0" + String(minutes)) + ":" + 
                (minutes > 9 ? String(minutes) : "0" + String(minutes)) + ":" +
                (seconds > 9 ? String(seconds) : "0" + String(seconds))
              );
        } else if (total >= 0) {
            setTime(
                (minutes > 9 ? String(minutes) : "0" + String(minutes)) + ":" + 
                (seconds > 9 ? String(seconds) : "0" + String(seconds))
              );
        }
    };

    return (
        <div className='middle-container'>
            <div className='middle-bg'>
            </div>
            <div className='middle-content'>
                <h1 className='timer-text'>{time}</h1>
                <button onClick={handleButtonClick} className='timer-button'>{isRunning ? 'pause' : 'start'}</button>
            </div>
        </div>
    );
  };
  
export default Timer;