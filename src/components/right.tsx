import SideCol from "./SideCol";
import Scene from "./ThreeScene/Scene";
import Leaderboard from "./Leaderboard/Leaderboard.tsx"

const Right = () => {
    return (
      <div className="relative flex flex-col h-[85%] self-center w-[22.5%] justify-between">
        {/* <div className="flex flex-col">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <Scene />
            </div>
          </div>
        </div> */}
        <Leaderboard />
      </div>
    );
  };
  
export default Right;
