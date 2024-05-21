import React from "react";
import {TodolistTitle} from "./TodolistTitle";
import {TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
}

export type TodolistTitlePropsType = {
    title: string
}


export const Todolist = ({title, tasks, date}: TodolistPropsType) => {

    const tasksList = tasks.length === 0 ? "Тасок нет" : tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })

    return (
        <div className="todolist">

            <div className="todolistHeader">
                <TodolistTitle title={title}/>
                <Button title="x"/>
            </div>

            <div>
                <input/>
                <Button title="+"/>

            </div>

            <ul>{tasksList}</ul>

            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>

            <div>{date}</div>
        </div>
    )
}
