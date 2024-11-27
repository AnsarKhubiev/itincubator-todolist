import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {ChangeEvent} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";

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

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
        }

        return (
            <ListItem
                key={task.id}
                className={task.isDone ? 'is-done' : ''}
                sx={getListItemSx(task.isDone)}
            >
                <div>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} size={"small"}/>
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                </div>

                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
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

            <div className="todolist-title-container">
                <h3><EditableSpan title={title} changeTitle={changeTodoListTitleHandler}/></h3>
                <IconButton aria-label="delete" onClick={deleteTodolist}><DeleteIcon/></IconButton>
            </div>

            <AddItemForm addItem={addNewTask}/>

            <List>{tasksList}</List>

            <Box component={"div"} sx={filterButtonsContainerSx}>

                <Button
                    variant={filter === "all" ? "contained" : "outlined"}
                    onClick={changeFilterTasksHandler("all")}
                    color={"primary"}
                >
                    All
                </Button>

                <Button
                    variant={filter === "active" ? "contained" : "outlined"}
                    onClick={changeFilterTasksHandler("active")}
                    color={"secondary"}
                >
                    Active
                </Button>

                <Button
                    variant={filter === "completed" ? "contained" : "outlined"}
                    onClick={changeFilterTasksHandler("completed")}
                    color={"success"}
                >
                    Completed
                </Button>
            </Box>
        </div>
    )
}
