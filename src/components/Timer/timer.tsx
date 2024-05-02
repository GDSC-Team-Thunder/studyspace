import { useState, useEffect } from "react";
import Reset from '../../assets/trash.svg';
import Delete from '../../assets/delete-arrow.svg';
import Popup from 'reactjs-popup';
import SettingsMenu from './settingsMenu';
import Loop from './loop';
import 'reactjs-popup/dist/index.css';
import '../../css/timer.css';

interface TimerProps {
    hideSidebars: boolean;
    setHideSidebars: React.Dispatch<React.SetStateAction<boolean>>;
  }

const Timer: React.FC<TimerProps> = ({ hideSidebars, setHideSidebars }) => {
    const [sections, setSections] = useState({
        pomodoro: { duration: 1500, symbol: "⭐ ", active: true},
        short: { duration: 300, symbol: "🌙 ", active: false},
        long: { duration: 300, symbol: "🌕 ", active: false},
    })
    const [total, setTotal] = useState(sections.pomodoro.duration);
    const [time, setTime] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const [queue, setQueue] = useState(["⭐ ", "🌙 ", "⭐ ", "🌙 ", "⭐ ", "🌕 "]);
    const [isLooping, setIsLooping] = useState(false);
    const [loopCurrent, setLoopCurrent] = useState(0);
    const [loopQueue, setLoopQueue] = useState<string[]>([]);
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

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

    const getSectionBySymbol = (symbol: string): keyof typeof sections => {
        const sectionKey = Object.keys(sections).find((key) => sections[key as keyof typeof sections].symbol === symbol);
        return sectionKey ? sectionKey as keyof typeof sections : 'pomodoro';
    };

    const queueNext = () => {
        const oldSection = getSectionBySymbol(queue[0]);

        queue.shift();
        const newIcon = queue[0];
        const newSection = getSectionBySymbol(newIcon);

        setSections(prevState => ({
            ...prevState,
            [oldSection]: {
              ...prevState[oldSection],
              active: false
            },
            [newSection]: {
              ...prevState[newSection],
              active: true
            }
          }));

        setTotal(sections[newSection].duration);
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
        <div className={`relative flex flex-col bg-bgColor/10 h-[85%] rounded-[25px] self-center justify-center ${!hideSidebars ? 'w-[52%]' : 'w-[100%]'}`}>
            <div className='relative flex flex-col w-[75%] items-center self-center mt-20'>
                <div className='text-center'>
                    <h1 className='timer-text'>{time}</h1>
                    <div className='flex justify-center'>
                        <SettingsMenu 
                        setTotal={setTotal} 
                        sections={sections} 
                        setSections={setSections}
                        hideSidebars={hideSidebars}
                        setHideSidebars={setHideSidebars}
                        />
                        <button onClick={timerButton} className='timer-button'>{isRunning ? 'pause' : 'start'}</button>
                        <Loop
                        setLoopQueue={setLoopQueue}
                        isLooping={isLooping}
                        setIsLooping={setIsLooping}
                        queue={queue}
                        />
                    </div>
                    <br></br>
                    <div className='flex justify-center items-center space-x-2'>
                        <button onClick={pomodoroButton} className={`text-offWhite text-xl w-40 px-0 py-3 ${sections.pomodoro.active ? 'bg-darkPink hover:bg-orangey' : 'bg-darkBlue hover:bg-orangey'}`}>pomodoro ⭐</button>
                        <button onClick={shortButton} className={`text-offWhite text-xl w-40 px-0 py-3 ${sections.short.active ? 'bg-darkPink hover:bg-orangey' : 'bg-darkBlue hover:bg-orangey'}`}>short break 🌙</button>
                        <button onClick={longButton} className={`text-offWhite text-xl w-40 px-0 py-3 ${sections.long.active ? 'bg-darkPink hover:bg-orangey' : 'bg-darkBlue hover:bg-orangey'}`}>long break 🌕</button>
                    </div>
                </div>
                <div className='flex flex-col w-full max-w-[510px] text-left mt-20'>
                    <h2 className='text-[20px] ml-1 my-1 font-bold'>queue</h2>
                    { isLooping ? 
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
                    : 
                        <div className='bg-hotPink rounded-[25px] w-full h-9 px-3 py-1 flex justify-between items-center overflow-hidden'>
                            <p className='whitespace-nowrap overflow-hidden'>{loopQueue}</p>
                        </div>
                    };
                </div>
            </div>
        </div>
    );
  };
  
export default Timer;

// pause timer when menu is open
// some bug where 2 things were active at the same time but idk how to replicate it...
// when deleting everything from queue, current active section should be inactive