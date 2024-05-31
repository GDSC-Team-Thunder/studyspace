import Scene from "./ThreeScene/Scene";
import Leaderboard from "./Leaderboard/Leaderboard.tsx";

interface RightProps {
  userId: string;
}

const Right: React.FC<RightProps> = ({ userId }) => {
  return (
    <div className="relative flex flex-col h-[95%] self-center w-[22.5%] justify-between gap-4">
      <Scene />
      <Leaderboard userId={userId} />
    </div>
  );
};

export default Right;
