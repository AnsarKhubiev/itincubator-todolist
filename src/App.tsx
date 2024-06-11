import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // DATA
    const todoListTitle = "What to learn"

    // global state
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "REACT", isDone: false}
    ])


    // state management => useState, useReducer, redux
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title, // тоже, что и tittle: title
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState = tasks.map(t => t.id === taskId ? {id: v1(), title: t.title, isDone: newIsDoneValue} : t)
        setTasks(nextState)
    }

    //UI (User Interface)

    // local state
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // Фильтрация тасок
    const getFilteredTasks = (allTasks: TaskType[], currentFilter: FilterValuesType) => {
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
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
