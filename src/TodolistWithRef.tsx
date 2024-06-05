import React from "react";
import {TodolistHeader} from "./TodolistHeader";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TodolistTitlePropsType = {
    title: string
}


export const Todolist = (
    {
        title,
        tasks,
        date,
        removeTask,
        changeTodolistFilter,
        addTask
    }: TodolistPropsType) => {

    const taskTitleInput = React.useRef<HTMLInputElement>(null)

    const tasksList = tasks.length === 0 ? "Тасок нет" : tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title="x" onClickHandler={() => removeTask(task.id)}/>
            </li>
        )
    })

    const addNewTask = () => {
        if (taskTitleInput.current){
            taskTitleInput.current.value.trim() !== "" && addTask(taskTitleInput.current.value)
            taskTitleInput.current.value = ""
        }

    }

    return (
        <div className="todolist">

            <div className="todolistHeader">
                <TodolistHeader title={title}/>
            </div>

            <div>
                <input ref={taskTitleInput}/>
                <Button onClickHandler={addNewTask} title="+"/>
            </div>

            <ul>{tasksList}</ul>

            <div>
                <Button title="All" onClickHandler={() => changeTodolistFilter("all")}/>
                <Button title="Active" onClickHandler={() => changeTodolistFilter("active")}/>
                <Button title="Completed" onClickHandler={() => changeTodolistFilter("completed")}/>
            </div>

            <div>{date}</div>
        </div>
    )
}
