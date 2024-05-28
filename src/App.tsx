import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL (Business Logic Layer)
    const todoListTitle = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    // Удаление таски
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    //UI (User Interface)
    // Фильтрация тасок
    const getFilteredTasks = (allTasks: TaskType[], currentFilter: FilterValuesType): TaskType[] => {
        switch (currentFilter) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={filteredTasks}
                date="22.04.24"
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
            />
        </div>
    );
}

export default App;
