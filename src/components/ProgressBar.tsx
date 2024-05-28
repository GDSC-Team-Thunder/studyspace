import { useEffect, useState, useRef } from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressBar = ({ isRunning, total, elapsedTime }) => {
  const [progress, setProgress] = useState((elapsedTime / total) * 100);
  const progressRef = useRef(progress);
  const startTimeRef = useRef(Date.now() - (elapsedTime / total) * total * 1000);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      startTimeRef.current = Date.now() - (elapsedTime / 100) * total * 1000;
      interval = setInterval(() => {
        const newElapsedTime = (Date.now() - startTimeRef.current) / 1000;
        const newProgress = (newElapsedTime / total) * 100;
        setProgress(newProgress >= 100 ? 100 : newProgress);
        progressRef.current = newProgress;
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, total]);

  return (
    <div className="relative w-[600px] h-[14px] bg-offWhite rounded-full overflow-visible">
      <Progress.Root
        className="relative w-full h-full"
        style={{
          transform: 'translateZ(0)',
        }}
        value={progress}
      >
        <div
          className="absolute top-0 left-0 h-full bg-hotPink rounded-full"
          style={{
            width: `${progress}%`,
            transition: 'width 1s linear',
          }}
        />
        <div
          className="absolute top-[-26px] flex items-center"
          style={{
            left: `${progress}%`,
            transition: 'left 1s linear',
            transform: 'translateX(-50%)', // Center the star
          }}
        >
          <span
            role="img"
            aria-label="star"
            style={{
              fontSize: '40px',
              filter: 'brightness(0.9)', // Darken the star
            }}
          >
          ⭐
          </span>
        </div>
      </Progress.Root>
    </div>
  );
};

export default ProgressBar;
