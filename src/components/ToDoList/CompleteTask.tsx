import Task from "./Task";
import Checked from "../../assets/checked.svg"
import YellowX from "../../assets/yellow_x.svg"

type propType = {
    task: Task,
    onIncomplete: (task: Task) => void,
    onDelete: (task: Task) => void
}

export default function CompleteTask(props: propType) {
    return (
        <li className="flex flex-row list-none p-3 w-full items-center justify-between bg-[#1D006F] my-2 rounded-xl">
            <div className="flex flex-auto items-center">
                <img className="flex-initial mr-3 cursor-pointer" src={Checked} alt="Checked" onClick={() => props.onIncomplete(props.task)}/>
                <p className="flex-initial text-[#F32FBC] text-left text-bold text-[#FFC806] overflow-wrap" style={{textDecoration: 'line-through'}}>{props.task.description}</p>
            </div>
            <img className="flex flex-initial cursor-pointer" src={YellowX} alt="X" onClick={() => props.onDelete(props.task)}/>
        </li>
    );
}