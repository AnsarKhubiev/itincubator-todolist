import React, {KeyboardEvent, ChangeEvent} from "react";
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

    const [taskTitle, setTaskTitle] = React.useState("")
    console.log(taskTitle)

    const tasksList = tasks.length === 0 ? "Тасок нет" : tasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title="x" onClickHandler={removeTaskHandler}/>
            </li>
        )
    })

    const addNewTaskHandler = () => {
        taskTitle.trim().length && addTask(taskTitle.trim())
        setTaskTitle("")
    }

    const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && taskTitle.length && taskTitle.length <= 15 && addNewTaskHandler()
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const changeTodolistFilterHandlerCreater = (filter: FilterValuesType) =>()=> changeTodolistFilter(filter)

    return (
        <div className="todolist">

            <div className="todolistHeader">
                <TodolistHeader title={title}/>
            </div>

            <div>
                <input
                    onKeyDown={onKeyDownAddNewTaskHandler}
                    value={taskTitle}
                    onChange={setTaskTitleHandler}
                />

                <Button
                    onClickHandler={addNewTaskHandler}
                    title="+"
                    isDisabled={!taskTitle.trim().length || taskTitle.length > 15}/>

                {!taskTitle.length && <div>"Please enter title"</div>}
                {taskTitle.length > 15 && <div>Task title is to long</div>}
            </div>

            <ul>{tasksList}</ul>

            <div>
                <Button title="All" onClickHandler={changeTodolistFilterHandlerCreater("all")}/>
                <Button title="Active" onClickHandler={changeTodolistFilterHandlerCreater("active")}/>
                <Button title="Completed" onClickHandler={changeTodolistFilterHandlerCreater("completed")}/>
            </div>

            <div>{date}</div>
        </div>
    )
}
