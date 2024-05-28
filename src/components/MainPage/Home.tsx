import Timer from "../Timer/timer.tsx";
import List from "../ToDoList/List.tsx";
import Right from "../right.tsx";

function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen">
      <div className="flex flex-row justify-between items-center mt-5 w-[95vw]">
        <p className="flex-grow-0 text-[48px] font-bold">studyspace</p>
        <div className="flex flex-row ml-auto space-x-4">
          <p className="flex flex-grow-0 text-[24px] font-bold">sign up</p>
          <p className="flex flex-grow-0 text-[24px] font-bold">log in</p>
        </div>
      </div>
      <div className="flex flex-grow justify-between flex-row w-[95vw]">
        <List />
        <Timer />
        <Right />
      </div>
    </div>
  );
}

export default Home;
