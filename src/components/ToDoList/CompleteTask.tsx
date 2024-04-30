import Task from "./Task";
import Checked from "../../assets/checked.svg"
import PinkX from "../../assets/pink_x.svg"

type propType = {
    task: Task,
    onIncomplete: (task: Task) => void,
    onDelete: (task: Task) => void
}

export default function CompleteTask(props: propType) {
    return (
        <li className="flex flex-row list-none p-3.5 w-full items-center justify-between bg-white my-1 rounded-md">
            <img src={Checked} alt="Checked" onClick={() => props.onIncomplete(props.task)}/>
            <p className="flex self-center text-[#F32FBC] truncate" style={{textDecoration: 'line-through'}}>{props.task.description}</p>
            <img src={PinkX} alt="X" onClick={() => props.onDelete(props.task)}/>
        </li>
    );
}