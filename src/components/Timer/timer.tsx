import { useState, useEffect } from "react";
import Reset from '../../assets/trash.svg';
import Delete from '../../assets/delete-arrow.svg';
import SettingsMenu from './settingsMenu';
import Loop from './loop';
import 'reactjs-popup/dist/index.css';
import '../../css/timer.css';

interface TimerProps {
    hideSidebars: boolean;
    setHideSidebars: React.Dispatch<React.SetStateAction<boolean>>;
  }

interface Section {
    duration: number;
    symbol: string;
    active: boolean;
}

interface SectionsState {
    pomodoro: Section;
    short: Section;
    long: Section;
}

const Timer: React.FC<TimerProps> = ({ hideSidebars, setHideSidebars }) => {
    const [sections, setSections] = useState<SectionsState>({
        pomodoro: { duration: 1500, symbol: "⭐ ", active: true},
        short: { duration: 300, symbol: "🌙 ", active: false},
        long: { duration: 900, symbol: "🌕 ", active: false},
    })
    const [total, setTotal] = useState<number>(sections.pomodoro.duration);
    const [time, setTime] = useState<string>('');
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [queue, setQueue] = useState<string[]>(["⭐ ", "🌙 ", "⭐ ", "🌙 ", "⭐ ", "🌕 "]);
    const [isLooping, setIsLooping] = useState<boolean>(false);
    const [loopCurrent, setLoopCurrent] = useState<number>(0);
    const [loopQueue, setLoopQueue] = useState<string[]>([]);

    useEffect(() => {
        updateTimer();

        if ((total === 0) && (queue.length != 0)) {
            if (loopQueue.length != 0) {
                loopQueueNext();
            } else {
                queueNext();
            }
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
        if (isRunning == false) {
            const currentSection = getSectionBySymbol(queue[0]);
            setActiveState(currentSection);
        };
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

    const resetActiveState = () => {
        setSections(prevState => {
            const updatedSections = {};
            for (const sectionKey in prevState) {
                updatedSections[sectionKey] = {
                    ...prevState[sectionKey],
                    active: false
                };
            }
            return updatedSections;
        });
    };

    const setActiveState = (section: string | null) => {
        setSections((prevState) => {
            const updatedSections = { ...prevState };
    
            updatedSections[section] = {
                ...updatedSections[section],
                active: true,
            };
    
            return updatedSections;
        });
    };

    const deactivateState = (section: string | null) => {
        setSections((prevState) => {
            const updatedSections = { ...prevState };
    
            updatedSections[section] = {
                ...updatedSections[section],
                active: false,
            };
    
            return updatedSections;
        });
    };

    const clearQueue = () => {
        setIsRunning(false);
        setQueue([]);
        setTotal(0);
        resetActiveState();
        updateTimer();
    };

    const getSectionBySymbol = (symbol: string): keyof typeof sections | null => {
        const sectionKey = Object.keys(sections).find((key) => sections[key as keyof typeof sections].symbol === symbol);
        return sectionKey ? sectionKey as keyof typeof sections : null;
    };

    const queueNext = () => {
        const oldSection = getSectionBySymbol(queue[0]);
        queue.shift();
        const newIcon = queue[0];
        const newSection = getSectionBySymbol(newIcon);

        if (newSection == null) {
            setIsRunning(false);
            resetActiveState();
            return;
        }

        deactivateState(oldSection);
        setActiveState(newSection);
        setTotal(sections[newSection].duration);
    };

    const loopQueueNext = () => {
        const oldSection = getSectionBySymbol(loopQueue[loopCurrent]);
        if (loopCurrent === loopQueue.length - 1) {
            setLoopCurrent(0);
        } else {
            setLoopCurrent(loopCurrent + 1);
        }
        const newSectionIndex = loopCurrent === loopQueue.length - 1 ? 0 : loopCurrent + 1;
        const newSection = getSectionBySymbol(loopQueue[newSectionIndex]);

        deactivateState(oldSection);
        setActiveState(newSection);
        setTotal(sections[newSection].duration);

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
 
    const updateTimer = () => {
        let { hours, minutes, seconds } =
            getTimeRemaining();

        if ((total >= 0) && (hours != 0)) {
            setTime(
                (hours> 9 ? String(hours) : "0" + String(hours)) + ":" + 
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
                    { !isLooping ? 
                        <div>
                            <h2 className='text-[20px] ml-1 my-1 font-bold'>queue</h2>
                            <div className='bg-darkBlue rounded-[25px] w-full h-9 px-3 py-1 flex justify-between items-center'>
                                <p className='whitespace-nowrap overflow-y-scroll scrollbar-hide'>{queue}</p>
                                <div className='flex items-center flex-shrink-0'>
                                    <button className='bg-transparent p-0 m-0'>
                                        <img onClick={deleteButton} className='w-[30px] h-[30px] mx-2 my-0 flex-shrink-0' src={Delete} alt="delete" />
                                    </button>
                                    <button className='bg-transparent p-0 m-0'>
                                        <img onClick={clearQueue} className='w-[22px] h-[22px] my-0 flex-shrink-0' src={Reset} alt="reset" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    : 
                        <div>
                            <h2 className='text-[20px] ml-1 my-1 font-bold'>queue is looping...</h2>
                            <div className='bg-hotPink rounded-[25px] w-full h-9 px-3 py-1 flex justify-between items-center'>
                                <p className='whitespace-nowrap overflow-y-scroll scrollbar-hide'>{loopQueue}</p>
                            </div>
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