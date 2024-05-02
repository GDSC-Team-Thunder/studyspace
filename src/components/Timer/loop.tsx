import { useState, useEffect } from "react";
import WhiteLoop from '../../assets/infinity-white.svg';
import OrangeLoop from '../../assets/infinity-orange.svg';


interface LoopProps {
    queue: string[];
  }
  
  const Loop: React.FC<LoopProps> = ({ queue }) => {
    const [isLooping, setIsLooping] = useState(false);
    // const [loopCurrent, setLoopCurrent] = useState(0);
    const [loopQueue, setLoopQueue] = useState<string[]>([]);
    
    const loopButton = () => { 
        setIsLooping(prevIsLooping => !prevIsLooping);
        if (isLooping == true) {
            setLoopQueue(queue);
        }
    }

    return (
        <div>
            { loopQueue.length == 0 ? 
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