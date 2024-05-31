import * as Progress from "@radix-ui/react-progress";

interface ProgressBarProps {
  elapsedTime: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ elapsedTime, total }) => {
  const progress = Math.min((elapsedTime / total) * 100, 100);

  return (
    <div className="relative w-[600px] h-[14px] bg-offWhite rounded-full overflow-visible">
      <Progress.Root
        className="relative w-full h-full"
        style={{
          transform: "translateZ(0)",
        }}
        value={progress}
      >
        <div
          className="absolute top-0 left-0 h-full bg-hotPink rounded-full"
          style={{
            width: `${progress}%`,
            transition: "width 1s linear",
          }}
        />
        <div
          className="absolute top-[-26px] flex items-center"
          style={{
            left: `${progress}%`,
            transition: "left 1s linear",
            transform: "translateX(-50%)", // Center the star
          }}
        >
          <span
            role="img"
            aria-label="star"
            style={{
              fontSize: "40px",
              filter: "brightness(0.9)", // Darken the star
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
