import React from "react";
import {TodolistHeader} from "./TodolistHeader";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: number) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
}

export type TodolistTitlePropsType = {
    title: string
}


export const Todolist = ({title, tasks, date, removeTask, changeTodolistFilter}: TodolistPropsType) => {

    const tasksList = tasks.length === 0 ? "Тасок нет" : tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title="x" onClickHandler={() => removeTask(task.id)}/>
            </li>
        )
    })

    return (
        <div className="todolist">

            <div className="todolistHeader">
                <TodolistHeader title={title}/>
                <Button title="x"/>
            </div>

            <div>
                <input/>
                <Button title="+"/>
            </div>

            <ul>{tasksList}</ul>

            <div>
                <Button title="All" onClickHandler={() => changeTodolistFilter('all')}/>
                <Button title="Active" onClickHandler={() => changeTodolistFilter('active')}/>
                <Button title="Completed" onClickHandler={() => changeTodolistFilter('completed')}/>
            </div>

            <div>{date}</div>
        </div>
    )
}
