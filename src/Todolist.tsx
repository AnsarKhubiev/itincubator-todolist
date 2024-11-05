import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {TodolistHeader} from "./TodolistHeader";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}

export type TodolistTitlePropsType = {
    title: string
}


export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = React.useState("")
    const [taskInputError, setTaskInputError] = useState<string | null>(null)

    const tasksList = props.tasks.length === 0 ? "Тасок нет" : props.tasks.map(task => {
        const removeTaskHandler = () => props.removeTask(task.id, props.todolistId)
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)}
                />
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <Button title="x" onClickHandler={removeTaskHandler}/>
            </li>
        )
    })

    const addNewTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle.length) {
            props.addTask(taskTitle.trim(), props.todolistId)
            setTaskTitle("")
        } else {
            setTaskInputError("Title is required")
        }
    }

    const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && taskTitle.length && taskTitle.length <= 15 && addNewTaskHandler()
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        taskInputError && setTaskInputError(null)
        setTaskTitle(e.currentTarget.value)
    }

    const changeTodolistFilterHandlerCreater = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todolistId)

    const isAddTaskButtonDisabled = !taskTitle.trim().length || taskTitle.length > 15
    const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Recommended task title is 15 charters</div>
    const userTaskEmptyTitleWarning = taskInputError && <div>"Please enter title"</div>

    const deleteTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div className="todolist">

            <div className="todolistHeader">
                <TodolistHeader title={props.title}/>
                <button onClick={deleteTodolist}>X</button>
            </div>

            <div>
                <input
                    onKeyDown={onKeyDownAddNewTaskHandler}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    className={taskInputError ? "taskInputError" : ""}
                />

                <Button
                    onClickHandler={addNewTaskHandler}
                    title="+"
                    isDisabled={isAddTaskButtonDisabled}/>

                {userTaskEmptyTitleWarning}
                {userTaskTitleLengthWarning}
            </div>

            <ul>{tasksList}</ul>

            <div className='filter-btn'>
                <Button
                    classes={props.filter === "all" ? "active" : ""}
                    title="All"
                    onClickHandler={changeTodolistFilterHandlerCreater("all")}
                />
                <Button
                    classes={props.filter === "active" ? "active" : ""}
                    title="Active"
                    onClickHandler={changeTodolistFilterHandlerCreater("active")}
                />
                <Button
                    classes={props.filter === "completed" ? "active" : ""}
                    title="Completed"
                    onClickHandler={changeTodolistFilterHandlerCreater("completed")}
                />
            </div>
        </div>
    )
}
