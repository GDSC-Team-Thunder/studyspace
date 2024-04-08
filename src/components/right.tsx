import SideCol from "./SideCol";
import Scene from "./ThreeScene/Scene";

const Right = () => {
    return (
      <SideCol>
        <div className="flex flex-col">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <Scene />
            </div>
          </div>
        </div>
      </SideCol>
    );
  };
  
export default Right;
