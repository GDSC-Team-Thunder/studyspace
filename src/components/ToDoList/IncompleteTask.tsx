import Task from "./Task";
import Unchecked from "../../assets/unchecked.svg"
import WhiteX from "../../assets/white_x.svg"

type propType = {
    task: Task,
    onComplete: (task: Task) => void,
    onDelete: (task: Task) => void,
}

export default function IncompleteTask(props: propType) {
    return (
        <li className="flex flex-row list-none p-3.5 w-full items-center justify-between bg-[#1D006F] my-2 rounded-xl">
            <div className="flex flex-auto items-center">
                <img className="flex-initial mr-3 text-bold cursor-pointer" src={Unchecked} alt="Unchecked" onClick={() => props.onComplete(props.task)}/>
                <span className="flex-initial text-black text-left text-white overflow-wrap">{props.task.description}</span>
            </div>
            <img className="flex-end cursor-pointer" src={WhiteX} alt="X" onClick={() => props.onDelete(props.task)}/>
        </li>
    );
}