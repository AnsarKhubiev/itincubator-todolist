import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const initialState = {}

export const tasksReducer = (state: TasksStateType = initialState,
                             action: ActionType,
                             ): TasksStateType => {

    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }

        case 'ADD_TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }

        case 'CHANGE_TASK_STATUS': {
            const {todolistId, taskId, isDone} = action.payload
            const nextState = state[todolistId].map(t => t.id === taskId ? {
                id: v1(), title: t.title, isDone
            } : t)
            return {...state, [todolistId]: nextState}
        }
        case 'CHANGE_TASK_TITLE': {
            const {todolistId, taskId, title} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title} : t)
            }
        }

        case 'ADD-TODOLIST': return {[action.payload.todolistId]: [] ,...state}

        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {type: 'REMOVE_TASK', payload} as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {type: 'ADD_TASK', payload} as const
}

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    return {type: 'CHANGE_TASK_STATUS', payload} as const
}

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => {
    return {type: 'CHANGE_TASK_TITLE', payload} as const
}

//Action types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>


export type ActionType = RemoveTaskActionType |
    AddTaskType |
    ChangeTaskStatusType |
    ChangeTaskTitleType |
    AddTodolistActionType |
    RemoveTodolistActionType