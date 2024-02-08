import Task from "./Task";

type propType = {
    task: Task,
    onComplete: (task: Task) => void,
    onDelete: (task: Task) => void,
}

export default function IncompleteTask(props: propType) {
    return (
        <li className="flex flex-row list-none p-1 w-full">
            <span className="flex-1 self-center justify-items-start mx-1 truncate">{props.task.description}</span>
            <input className="justify-items-end mx-1" checked={false} type="checkbox" onChange={() => props.onComplete(props.task)}/>
            <button className="justify-items-end mx-1" onClick={() => props.onDelete(props.task)}>Delete</button>
        </li>
    );
}