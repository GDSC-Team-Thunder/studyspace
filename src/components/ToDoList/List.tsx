import {useState} from "react";
import Task from "./Task";
import IncompleteTask from "./IncompleteTask";
import CompleteTask from "./CompleteTask";

export default function List() {
    const [todo, editTodo] = useState<Task[]>([]);
    const [finished, editFinished] = useState<Task[]>([]);
    const [addText, setAddText] = useState<string>("");

    const addTask = () => {
        const newTask: Task = {id: Date.now(), description: addText};
        
        editTodo(current => [newTask, ...current]);
        setAddText("");
    }

    const onComplete = (task: Task) => {
        editTodo(current => current.filter(element => element.id != task.id));
        editFinished(current => [task, ...current]);
    }

    const onIncomplete = (task: Task) => {
        editTodo(current => [...current, task]);
        editFinished(current => current.filter(element => element.id != task.id));
    }

    const deleteIncomplete = (task: Task) => {
        editTodo(current => current.filter(element => element.id != task.id));
    }

    const deleteComplete = (task: Task) => {
        editFinished(current => current.filter(element => element.id != task.id));
    }

    const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter" && addText.length != 0) {
            addTask();
        }
    }

    return (
        <div className="relative flex flex-col h-[85%] bg-bgColor/10 
            rounded-[25px] self-center w-[22.5%] py-5 px-4 justify-between">
            <div className="flex flex-col">
                <span className="my-3 self-start font-bold text-2xl">to-do list</span>
                <ul className="flex flex-col w-full">
                    {todo.map(element => <IncompleteTask task={element} onComplete={onComplete} onDelete={deleteIncomplete}/>)}
                    {finished.map(element => <CompleteTask task={element} onIncomplete={onIncomplete} onDelete={deleteComplete}/>)}
                </ul>
            </div>
            <label className="flex flex-row items-center justify-between">
                <input className="flex-grow pl-3 mr-1 bg-slate-200 rounded-[25px] text-black placeholder-gray-500 h-full" 
                    placeholder="add items here..." value={addText} 
                    onChange={e => setAddText(e.target.value)}
                    onKeyDown={handleKeyEvent}/>
                <button className={`rounded-full text-2xl font-bold items-center 
                    py-2 px-4 h-full cursor-pointer ${addText.length == 0 && "bg-gray-400"}`}
                    disabled={addText.length == 0} 
                    onClick={addTask}>+</button>
            </label>
        </div>
    )
}