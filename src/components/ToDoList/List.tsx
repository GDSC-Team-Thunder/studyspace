import { useState } from "react";
import Task from "./Task";
import IncompleteTask from "./IncompleteTask";
import CompleteTask from "./CompleteTask";
import SideCol from "../SideCol";

export default function List() {
  const [todo, editTodo] = useState<Task[]>([]);
  const [finished, editFinished] = useState<Task[]>([]);
  const [addText, setAddText] = useState<string>("");

  const addTask = () => {
    const newTask: Task = { id: Date.now(), description: addText };

    editTodo((current) => [newTask, ...current]);
    setAddText("");
  };

  const onComplete = (task: Task) => {
    editTodo((current) => current.filter((element) => element.id != task.id));
    editFinished((current) => [task, ...current]);
  };

  const onIncomplete = (task: Task) => {
    editTodo((current) => [...current, task]);
    editFinished((current) =>
      current.filter((element) => element.id != task.id)
    );
  };

  const deleteIncomplete = (task: Task) => {
    editTodo((current) => current.filter((element) => element.id != task.id));
  };

  const deleteComplete = (task: Task) => {
    editFinished((current) =>
      current.filter((element) => element.id != task.id)
    );
  };

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter" && addText.length != 0) {
      addTask();
    }
  };

  return (
    <div className="relative flex flex-col h-[95%] w-[22.5%] self-center">
      <div className="relative flex flex-col h-full w-full bg-bgColor/10 
              rounded-[25px] self-center py-5 px-4 justify-between">
        <div className="flex flex-col">
          <span className="my-3 ml-1 self-start font-bold text-2xl">
            to-do list
          </span>
          <ul className="flex flex-col w-full">
            {todo.map((element) => (
              <IncompleteTask
                task={element}
                onComplete={onComplete}
                onDelete={deleteIncomplete}
              />
            ))}
            {finished.map((element) => (
              <CompleteTask
                task={element}
                onIncomplete={onIncomplete}
                onDelete={deleteComplete}
              />
            ))}
          </ul>
        </div>
        <label className="flex flex-row items-center justify-between">
          <input
            className="flex-grow h-10 px-3 mr-2.5 rounded-full bg-[#1D006F] placeholder:text-white text-white h-full overflow-hidden"
            placeholder="add items here..."
            value={addText}
            onChange={(e) => setAddText(e.target.value)}
            onKeyDown={handleKeyEvent}
          />
          <button
            className={`rounded-full h-10 text-2xl text-black font-bold
                      px-3 h-full cursor-pointer ${
                        addText.length == 0 && "bg-gray-400"
                      }`}
            disabled={addText.length == 0}
            onClick={addTask}>+</button>
        </label>
      </div>
      <iframe className="flex rounded-[12px] w-full bg-transparent mt-3 h-[80px]" src="https://open.spotify.com/embed/playlist/3GJU6WCxTv5jeIhIttI8ae?utm_source=generator&theme=0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
    </div>
  );
}
