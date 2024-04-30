import Task from "./Task";
import Unchecked from "../../assets/unchecked.svg"
import BlackX from "../../assets/black_x.svg"

type propType = {
    task: Task,
    onComplete: (task: Task) => void,
    onDelete: (task: Task) => void,
}

export default function IncompleteTask(props: propType) {
    return (
        <li className="flex flex-row list-none p-3.5 w-full items-center justify-between bg-white my-1 rounded-md">
            <img src={Unchecked} alt="Unchecked" onClick={() => props.onComplete(props.task)}/>
            <span className="flex text-black truncate">{props.task.description}</span>
            <img src={BlackX} alt="X" onClick={() => props.onDelete(props.task)}/>
        </li>
    );
}