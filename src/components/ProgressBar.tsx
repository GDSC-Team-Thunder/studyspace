import React from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    <Progress.Root
      className="relative overflow-hidden bg-offWhite rounded-full w-[500px] h-[15px]"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-hotPink w-full h-full transition-transform duration-[60s]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
    </div>
  );
};

export default ProgressBar;