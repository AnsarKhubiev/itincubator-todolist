import React, {KeyboardEvent, ChangeEvent, useState} from "react";
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
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    filter: FilterValuesType
}

export type TodolistTitlePropsType = {
    title: string
}


export const Todolist = (props: TodolistPropsType) => {
    const {
        title,
        tasks,
        date,
        removeTask,
        changeTodolistFilter,
        addTask,
        changeTaskStatus,
        filter
    } = props

    const [taskTitle, setTaskTitle] = React.useState("")
    const [taskInputError, setTaskInputError] = useState<string | null>(null)

    const tasksList = tasks.length === 0 ? "Тасок нет" : tasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id)
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                />
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <Button title="x" onClickHandler={removeTaskHandler}/>
            </li>
        )
    })

    const addNewTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle.length) {
            addTask(taskTitle.trim())
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

    const changeTodolistFilterHandlerCreater = (filter: FilterValuesType) => () => changeTodolistFilter(filter)

    const isAddTaskButtonDisabled = !taskTitle.trim().length || taskTitle.length > 15
    const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Recommended task title is 15 charters</div>
    const userTaskEmptyTitleWarning = taskInputError && <div>"Please enter title"</div>

    return (
        <div className="todolist">

            <div className="todolistHeader">
                <TodolistHeader title={title}/>
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

            <div>
                <Button
                    classes={filter === "all" ? "active" : ""}
                    title="All"
                    onClickHandler={changeTodolistFilterHandlerCreater("all")}
                />
                <Button
                    classes={filter === "active" ? "active" : ""}
                    title="Active"
                    onClickHandler={changeTodolistFilterHandlerCreater("active")}
                />
                <Button
                    classes={filter === "completed" ? "active" : ""}
                    title="Completed"
                    onClickHandler={changeTodolistFilterHandlerCreater("completed")}
                />
            </div>

            <div>{date}</div>
        </div>
    )
}
