import { useState, useEffect } from "react";
import Reset from '../../assets/trash.svg';
import Delete from '../../assets/delete-arrow.svg';
import Settings from '../../assets/settings-bold.svg';
import BlueLoop from '../../assets/infinity-blue.svg';
import OrangeLoop from '../../assets/infinity-orange.svg';
import Popup from 'reactjs-popup';
import SettingsMenu from './timer-settings';
import 'reactjs-popup/dist/index.css';
import '../../css/timer.css';

const Timer = () => {
    const [sections, setSections] = useState({
        pomodoro: { duration: 1500, symbol: "⭐ ", active: true},
        short: { duration: 300, symbol: "🌙 ", active: false},
        long: { duration: 900, symbol: "🌕 ", active: false},
    })
    const [total, setTotal] = useState(sections.pomodoro.duration);
    const [time, setTime] = useState<String>();
    const [isRunning, setIsRunning] = useState(false);
    const [queue, setQueue] = useState(["⭐ ", "🌙 ", "⭐ ", "🌙 ", "⭐ ", "🌕 "]);
    const [isLooping, setIsLooping] = useState(false);
    const [loopCurrent, setLoopCurrent] = useState(0);
    const [loopQueue, setLoopQueue] = useState<string[]>([]);
    const [svgColor, setSvgColor] = useState('#260093');

    useEffect(() => {
        updateTimer();

        if (total === 0) {
            if (loopQueue.length != 0) {
                loopQueueNext();
            }
            queueNext();
        }

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
        if (queue.length == 0) {
            setTotal(sections.pomodoro.duration);
        }
        setQueue(prevQueue => [...prevQueue, sections.pomodoro.symbol]);
    };
    const shortButton = () => {
        if (queue.length == 0) {
            setTotal(sections.short.duration);
        }
        setQueue(prevQueue => [...prevQueue, sections.short.symbol]);
    };
    const longButton = () => {
        if (queue.length == 0) {
            setTotal(sections.long.duration);
        }
        setQueue(prevQueue => [...prevQueue, sections.long.symbol]);
    };
    const deleteButton = () => {
        setQueue(prevQueue => {
            const newQueue = [...prevQueue];
            newQueue.pop();

            if (newQueue.length == 0) {
                setTotal(0);
                setIsRunning(false);
            }

            return newQueue;
          });
    };
    const clearQueue = () => {
        setQueue([]);
        setTotal(0);
        setIsRunning(false);
    };
    const loopButton = () => { 
        setIsLooping(prevIsLooping => !prevIsLooping);
        // if 
        // setLoopQueue(queue);
    }

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

    const getDurationBySymbol = (symbol: string) => {
        const section = Object.values(sections).find((s) => s.symbol === symbol);
        return section ? section.duration : 0;
    };

    const queueNext = () => {
        queue.shift();
        const newIcon = queue[0];

        const newTime = getDurationBySymbol(newIcon)
        setTotal(newTime);

    }
    const loopQueueNext = () => {
        if (loopCurrent == loopQueue.length) {
            setLoopCurrent(0);
        } else {
            setLoopCurrent(loopCurrent + 1);
        }

        const newTime = getDurationBySymbol(loopQueue[loopCurrent]);
        setTotal(newTime);
    }
 
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
        <div className='relative flex flex-col h-[85%] w-[52%] self-center justify-center'>
            <div className='relative flex flex-grow bg-bgColor/10 h-full w-full rounded-[25px] self-center justify-center'>
                <div className='relative flex flex-col w-[75%] items-center self-center justify-center'>
                    <div className='flex-grow text-center items-center justify-center'>
                        <h1 className='timer-text'>{time}</h1>
                        <div className='flex justify-center'>
                            <button className='bg-transparent p-0'>
                                    <img className='w-[50px] h-[50px] mx-4 flex-shrink-0' src={Settings} alt="settings"></img>
                            </button>
                            <button onClick={timerButton} className='timer-button'>{isRunning ? 'pause' : 'start'}</button>
                            { loopQueue.length == 0 ? 
                                <button onClick={loopButton} className='bg-transparent p-0'>
                                    <img className='w-[50px] h-[50px] mx-4 flex-shrink-0' src={BlueLoop} alt="settings"></img>
                                </button>
                                : <button onClick={loopButton} className='bg-transparent p-0'>
                                    <img className='w-[50px] h-[50px] mx-4 flex-shrink-0' src={OrangeLoop} alt="settings"></img>
                                </button>
                            }
                        </div>
                        <br></br>
                        <div className='flex justify-center items-center space-x-2'>
                            <button onClick={pomodoroButton} className='section-button'>pomodoro ⭐</button>
                            <button onClick={shortButton} className='section-button'>short break 🌙</button>
                            <button onClick={longButton} className='section-button'>long break 🌕</button>
                        </div>
                    </div>
                    <div className='flex flex-col w-full text-left mt-auto'>
                        <h2 className='text-[20px] ml-1 my-1 font-bold'>queue</h2>
                        <div className='bg-darkBlue rounded-[25px] w-full h-9 px-3 py-1 flex justify-between items-center overflow-hidden'>
                            <p className='whitespace-nowrap overflow-hidden'>{queue}</p>
                            <div className='flex items-center'>
                                <button className='bg-transparent p-0 m-0'>
                                    <img onClick={deleteButton} className='w-[30px] h-[30px] mx-2 my-0 flex-shrink-0' src={Delete} alt="delete" />
                                </button>
                                <button className='bg-transparent p-0 m-0'>
                                    <img onClick={clearQueue} className='w-[22px] h-[22px] my-0 flex-shrink-0' src={Reset} alt="reset" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
export default Timer;