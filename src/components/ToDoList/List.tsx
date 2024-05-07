import {useState} from "react";
import Task from "./Task";
import IncompleteTask from "./IncompleteTask";
import CompleteTask from "./CompleteTask";
import SideCol from "../SideCol";

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
        <SideCol>
            <div className="flex flex-col">
                <span className="ml-5 mt-3 self-start font-bold text-[17px]">ToDo List</span>
                <ul className="flex flex-col w-full">
                    {todo.map(element => <IncompleteTask task={element} onComplete={onComplete} onDelete={deleteIncomplete}/>)}
                    {finished.map(element => <CompleteTask task={element} onIncomplete={onIncomplete} onDelete={deleteComplete}/>)}
                </ul>
            </div>
            <label className="flex flex-row m-3">
                <input className="flex flex-1 p-1 bg-slate-200 pl-3 rounded-[25px] mr-2 text-black placeholder-black" placeholder="Add text" value={addText} onChange={e => setAddText(e.target.value)}/>
                <button className="flex rounded-full text-[17px] items-center" disabled={addText.length == 0} onClick={addTask}>+</button>
            </label>
        </SideCol>
    )
}
