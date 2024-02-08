import { useState, useEffect } from "react";
import Pause from '../assets/settings-bod.svg';
import Settings from '../assets/settings-bold.svg';
import '../css/timer.css';

const Timer = () => {
    const [total, setTotal] = useState(1500);
    const [time, setTime] = useState("25:00");
    const [isRunning, setIsRunning] = useState(false);
    const [sections, setSections] = useState({
        pomodoro: 1500,
        short_break: 300,
        long_break: 900,
    })
    const [queue, setQueue] = useState(["⭐", "🌙", "⭐", "🌙", "⭐", "🌕"])

    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(() => {
                setTotal(prevTotal => (prevTotal > 0 ? prevTotal - 1 : prevTotal));
                }, 1000);
        
                updateTimer();
                return () => clearInterval(intervalId);
        }

    }, [isRunning, total]);

    const timerButton = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };
    const pomodoroButton = () => {
        setQueue(prevQueue => [...prevQueue, "⭐"]);
    };
    const shortButton = () => {
        setQueue(prevQueue => [...prevQueue, "🌙"]);
    };
    const longButton = () => {
        setQueue(prevQueue => [...prevQueue, "🌕"]);
    };
    // const clearQueue = () => {
    //     setQueue([]);
    // };

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
                <div className='flex flex-col items-center'>
                    <h1 className='timer-text'>{time}</h1>
                    <button onClick={timerButton} className='timer-button'>{isRunning ? 'pause' : 'start'}</button>
                    <br></br>
                    <div className='flex justify-center space-x-2'>
                        <button onClick={pomodoroButton} className='section-button'>pomodoro ⭐</button>
                        <button onClick={shortButton} className='section-button'>short break 🌙</button>
                        <button onClick={longButton} className='section-button'>long break 🌕</button>
                    </div>
                    <div className='flex flex-col w-full text-left'>
                        <h2 className='text-[20px] ml-1'>queue</h2>
                        <div className='queue-container'>
                            <p>{queue}</p>
                        </div>
                        {/* <button onClick={clearQueue}>CLEAR :3</button> */}
                    <div></div>
                </div>
                </div>
            </div>
        </div>
    );
  };
  
export default Timer;