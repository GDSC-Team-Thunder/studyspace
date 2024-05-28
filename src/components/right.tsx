import Scene from "./ThreeScene/Scene";
import Leaderboard from "./Leaderboard/Leaderboard.tsx";

const Right = () => {
  return (
    <div className="relative flex flex-col h-[95%] self-center w-[22.5%] justify-between gap-4">
      <Scene />
      <Leaderboard />
    </div>
  );
};

export default Right;
