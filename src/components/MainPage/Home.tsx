import Timer from "../Timer/timer.tsx";
import List from "../ToDoList/List.tsx";
import Right from "../right.tsx";
import "../../css/App.css";
import { useState } from "react";

function Home() {
  const [hideSidebars, setHideSidebars] = useState<boolean>(false);

  return (
    <div className="App">
      <div className="flex justify-between flex-row h-screen w-[95vw]">
        {!hideSidebars && <List />}
        <Timer hideSidebars={hideSidebars} setHideSidebars={setHideSidebars} />
        {!hideSidebars && <Right />}
      </div>
    </div>
  );
}

export default Home;
