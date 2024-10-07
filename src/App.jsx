import { useEffect, useState } from "react"
import { Tasks } from "./components/Tasks"
import { AddTasks } from "./components/AddTask"
import { v4 } from "uuid"

export function App() {

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      // Preciso atualizar essa tarefa.
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted }
      }

      // Não preciso atualizar essa tarefa.
      return task
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id != taskId);

    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title, // como o nome da propriedade é o mesmo do parametro nao precisa fazer "title:title".
      description,
      isCompleted1: false,
    }
    setTasks([...tasks, newTask]) // quando atualiza um estado e ele é uma lista não pode usar ".push", não funciona.
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de tarefas
        </h1>
        <AddTasks
          onAddTaskSubmit={onAddTaskSubmit}
        />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  )
}