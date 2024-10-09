import { useEffect, useState } from "react"
import { Tasks } from "./components/Tasks"
import { AddTasks } from "./components/AddTask"
import { v4 } from "uuid"
import { Title } from "./components/title";

export function App() {

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])


  useEffect(() => {
    const fetchTasks = async () => {

      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        METHOD: "GET",
      });
      const data = await response.json()
      setTasks(data)
    };
    // SE QUISER, VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    // fetchTasks();
  }, []);

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
        <Title>
          Gerenciador de tarefas
        </Title>
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