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
        <div className="relative flex flex-col h-[85%]
         bg-[#FCFBF8] opacity-65 rounded-[25px] self-center w-[24%]">
            <label className="flex flex-row m-3">
                <input className="flex flex-1 p-1 rounded mr-2 text-white" placeholder="Add text" value={addText} onChange={e => setAddText(e.target.value)}/>
                <button disabled={addText.length == 0} onClick={addTask}>Add</button>
            </label>
            <ul className="flex flex-col w-full">
                {todo.map(element => <IncompleteTask task={element} onComplete={onComplete} onDelete={deleteIncomplete}/>)}
                {finished.map(element => <CompleteTask task={element} onIncomplete={onIncomplete} onDelete={deleteComplete}/>)}
            </ul>
        </div>
    )
}