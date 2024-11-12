import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}

export const Todolist = (props: TodolistPropsType) => {
    const {
        todolistId,
        title,
        tasks,
        changeTaskTitle,
        removeTask,
        changeFilter,
        changeTodoListTitle,
        addTask,
        changeTaskStatus,
        removeTodolist,
        filter
    } = props

    const tasksList = tasks.length === 0 ? "Тасок нет" : tasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id, todolistId)

        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(task.id, title, todolistId)
        }

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
                />
                <EditableSpan
                    title={task.title}
                    changeTitle={changeTaskTitleHandler}
                />
                <Button title="x" onClickHandler={removeTaskHandler}/>
            </li>
        )
    })

    const addNewTask = (title: string) => addTask(title, todolistId)

    const changeFilterTasksHandler = (filter: FilterValuesType) => () => {
        changeFilter(filter, todolistId)
    }

    const deleteTodolist = () => removeTodolist(todolistId)

    const changeTodoListTitleHandler = (title: string) => {
        changeTodoListTitle(title, todolistId)
    }

    return (
        <div className="todolist">

            <div className="todolistHeader">
                <h3>
                    <EditableSpan title={title} changeTitle={changeTodoListTitleHandler}/>
                </h3>
                <button onClick={deleteTodolist}>X</button>
            </div>

            <AddItemForm addItem={addNewTask}/>

            <ul>{tasksList}</ul>

            <div className="filter-btn">
                <Button
                    classes={filter === "all" ? "active" : ""}
                    title="All"
                    onClickHandler={changeFilterTasksHandler("all")}
                />
                <Button
                    classes={filter === "active" ? "active" : ""}
                    title="Active"
                    onClickHandler={changeFilterTasksHandler("active")}
                />
                <Button
                    classes={filter === "completed" ? "active" : ""}
                    title="Completed"
                    onClickHandler={changeFilterTasksHandler("completed")}
                />
            </div>
        </div>
    )
}
