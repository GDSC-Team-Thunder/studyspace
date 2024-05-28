import Timer from "../Timer/timer.tsx";
import List from "../ToDoList/List.tsx";
import Right from "../right.tsx";
import Header from "../header.tsx";
import "../../css/App.css";

function Home() {
  return (
    <div className="App">
      <Header/>
      <div className="flex justify-between align-top flex-row w-[95vw]">
        <List />
        <Timer />
        <Right />
      </div>
    </div>
  );
}

export default Home;
