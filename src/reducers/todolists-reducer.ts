import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        filter: FilterValuesType
        todolistId: string
    }
}

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        title: string
        todolistId: string
    }
}

export type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistFilterActionType |
    ChangeTodolistActionType

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.payload.todolistId)

        case 'ADD-TODOLIST':
            return [{id: v1(), title: action.payload.title, filter: "all"}, ...todolists]

        case 'CHANGE-TODOLIST-TITLE': {
            const {title, todolistId} = action.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const {filter, todolistId} = action.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        }

        default:
            return todolists
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => (
    {type: 'REMOVE-TODOLIST', payload: {todolistId}}
    )

export const  AddTodolistAC= (title: string, todolistId: string): AddTodolistActionType => (
    {type: 'ADD-TODOLIST', payload: {title, todolistId}}
)

export const  ChangeTodolistAC= (title: string, todolistId: string): ChangeTodolistActionType => (
    {type: 'CHANGE-TODOLIST-TITLE', payload: {title, todolistId}}
)

export const  ChangeTodolistFilterAC= (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => (
    {type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filter}}
)