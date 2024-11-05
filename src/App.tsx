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

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    //BLL (business logic layer):
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodoListType[]>([
        {id: todolistId_1, title: "What to learn", filter: "all",},
        {id: todolistId_2, title: "What to buy", filter: "all",},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "REACT", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Cola", isDone: false},
            {id: v1(), title: "Juice", isDone: false}
        ]
    })


    // state management => useState, useReducer, redux

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title, // тоже, что и tittle: title
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        const nextState = tasks[todolistId].map(t => t.id === taskId ? {
            id: v1(),
            title: t.title,
            isDone: newIsDoneValue
        } : t)
        setTasks({...tasks, [todolistId]: nextState})
    }

    //UI (User Interface)


    // Фильтрация тасок
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId
            ? {...tl, filter: filter} : tl))
    }

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

    const removeTodolist = (todolistId: string) => {
        const resultTodolists = todolists.filter( tl => tl.id !== todolistId)
        setTodolists(resultTodolists)
        delete tasks[todolistId]
    }

    return (

        <div className="App">
            {todolists.map(tl => {
                const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
