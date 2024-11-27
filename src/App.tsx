import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {AppBarComponent} from "./AppBarComponent";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

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

    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')

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

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        const nextState = tasks[todolistId].map(t => t.id === taskId ?
            {
                ...t,
                title
            } : t)
        setTasks({...tasks, [todolistId]: nextState})
    }

    //UI (User Interface)

    // Фильтрация тасок
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId
            ? {...tl, filter} : tl))
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

    const changeTodoListTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId
            ? {...tl, title} : tl))
    }

    const removeTodolist = (todolistId: string) => {
        const resultTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(resultTodolists)
        delete tasks[todolistId]
    }

    const addNewTodolist = (title: string) => {
        const todoListId = v1()
        setTodolists([{id: todoListId, title, filter: "all"}, ...todolists])
        setTasks({...tasks, [todoListId]: []})
    }

    const changeThemeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#307bb8',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/*темный background для всего App*/}
            <Container fixed>

                <AppBarComponent changeThemeMode={changeThemeMode}/>

                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addNewTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(tl => {
                        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
                        return (
                            <Grid key={tl.id}>
                                <Paper elevation={4} sx={{p: '0 20px 20px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        changeTaskTitle={changeTaskTitle}
                                        tasks={filteredTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeTodolistFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

            </Container>
        </ThemeProvider>
    )
}

export default App;
