import Task from "./Task";

type propType = {
    task: Task,
    onIncomplete: (task: Task) => void,
    onDelete: (task: Task) => void
}

export default function CompleteTask(props: propType) {
    return (
        <li className="flex flex-row list-none w-full p-1 justify-between">
            <span className="flex-1 self-center mx-1 truncate" style={{textDecoration: 'line-through'}}>{props.task.description}</span>
            <input className="justify-items-end mx-1" checked={true} type="checkbox" onClick={() => props.onIncomplete(props.task)}/>
            <button className="justify-items-end mx-1" onClick={() => props.onDelete(props.task)}>Delete</button>
        </li>
    );
}