import Timer from "../timer.tsx";
import Right from "../right.tsx";
import List from "../ToDoList/List.tsx";
import "../../css/App.css";

function Home() {
  return (
    <div className="App">
      <div className="flex justify-betweem flex-row h-screen w-[95vw]">
        <List />
        <Timer />
        <Right />
      </div>
    </div>
  );
}

export default Home;
