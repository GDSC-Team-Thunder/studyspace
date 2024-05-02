import Timer from "../Timer/timer.tsx";
import List from "../ToDoList/List.tsx";
// import "../../css/App.css";
// import Header from "../header.tsx";

function Home() {
  return (
    <div className="flex justify-between flex-row h-screen w-[95vw]">
      <List />
      <Timer />
      <List />
    </div>
  );
}

export default Home;
