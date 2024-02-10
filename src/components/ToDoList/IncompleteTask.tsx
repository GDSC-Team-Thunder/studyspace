import Task from "./Task";

type propType = {
    task: Task,
    onComplete: (task: Task) => void,
    onDelete: (task: Task) => void,
}

export default function IncompleteTask(props: propType) {
    return (
        <li className="flex flex-row list-none p-1 w-full items-center justify-between">
            <span className="flex self-center justify-items-start mx-5 truncate w-[60%]">{props.task.description}</span>
            <div className="flex-row items-center">
                <input className="justify-items-end mx-1" checked={false} type="checkbox" onChange={() => props.onComplete(props.task)}/>
                <button className="justify-items-end p-2 text-sm" onClick={() => props.onDelete(props.task)}>Delete</button>
            </div>
        </li>
    );
}