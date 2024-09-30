import { useState } from "react"
import { Tasks } from "./components/Tasks"
import { AddTasks } from "./components/AddTask"

export function App() {
  //State (Estado)
  const [message, setMessage] = useState('Olá Mundo')

  return (
    <div>
      <h1>Gerenciador de tarefas</h1>
      <AddTasks />
      <Tasks />
    </div>
  )
}