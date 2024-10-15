import { CheckIcon, ChevronRightIcon, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Tasks({
    tasks,
    onTaskClick,
    onDeleteTaskClick,
}) {

    const navigate = useNavigate();

    function onSeeDetailsClick(task) {
        const query = new URLSearchParams(); // faz os tratamentos necessario na string para não ter conflito.
        query.set("title", task.title);
        query.set("description", task.description);
        navigate(`/task?${query.toString()}`);
    }

    return (
        <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
            {tasks
                .map(task =>
                    <li key={task.id} className="flex gap-2">
                        <button
                            onClick={() => onTaskClick(task.id)}
                            className={`bg-slate-400 text-left flex items-center gap-2 w-full text-white p-2 rounded-md ${task.isCompleted && 'line-through'}`}>
                            {task.isCompleted && <CheckIcon />}
                            {task.title}
                        </button>
                        <Button
                            onClick={() => onSeeDetailsClick(task)} >
                            <ChevronRightIcon />
                        </Button>
                        <Button
                            onClick={() => onDeleteTaskClick(task.id)}
                        >
                            <Trash />
                        </Button>
                    </li>
                )}
        </ul>
    )
}