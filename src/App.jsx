import { useState } from "react"
import { Tasks } from "./components/Tasks"
import { AddTasks } from "./components/AddTask"

export function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Estudar programação',
      description: 'Estudar para se tornar um desenvolvedor full stack.',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Caminhada',
      description: 'Caminhada para melhora da saúde.',
      isCompleted: false,
    },
  ]);

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

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de tarefas
        </h1>
        <AddTasks />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  )
}