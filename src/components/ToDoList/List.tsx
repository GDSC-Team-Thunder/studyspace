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

    return (
        <div className="relative flex flex-col h-[85%] bg-bgColor/10 rounded-[25px] self-center w-[22.5%] p-1 justify-between">
            <div className="flex flex-col">
                <span className="ml-5 mt-3 self-start font-bold text-[17px]">to-do list</span>
                <ul className="flex flex-col w-full">
                    {todo.map(element => <IncompleteTask task={element} onComplete={onComplete} onDelete={deleteIncomplete}/>)}
                    {finished.map(element => <CompleteTask task={element} onIncomplete={onIncomplete} onDelete={deleteComplete}/>)}
                </ul>
            </div>
            <label className="flex flex-row m-3">
                <input className="flex flex-1 p-1 bg-slate-200 pl-3 rounded-[25px] mr-2 text-black placeholder-black" placeholder="Add text" value={addText} onChange={e => setAddText(e.target.value)}/>
                <button className="flex rounded-full text-[17px] items-center" disabled={addText.length == 0} onClick={addTask}>+</button>
            </label>
        </div>
    )
}