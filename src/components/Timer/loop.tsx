import { useState, useEffect } from "react";
import WhiteLoop from '../../assets/infinity-white.svg';
import OrangeLoop from '../../assets/infinity-orange.svg';


interface LoopProps {
    isLooping: boolean;
    setIsLooping: React.Dispatch<React.SetStateAction<boolean>>;
    setLoopQueue: React.Dispatch<React.SetStateAction<string[]>>;
    queue: string[];
  }
  
const Loop: React.FC<LoopProps> = ({ setLoopQueue, isLooping, setIsLooping, queue }) => {
    
    const loopButton = () => { 
        setIsLooping(prevIsLooping => !prevIsLooping);
        setLoopQueue(isLooping ? [] : queue);
    }

    return (
        <div>
            { !isLooping ? 
                <button onClick={loopButton} className='bg-transparent p-0'>
                    <img className='w-[50px] h-[50px] mx-4 flex-shrink-0' src={WhiteLoop} alt="settings"></img>
                </button>
                : <button onClick={loopButton} className='bg-transparent p-0'>
                    <img className='w-[50px] h-[50px] mx-4 flex-shrink-0' src={OrangeLoop} alt="settings"></img>
                </button>
            }
        </div>
    )
}

export default Loop;