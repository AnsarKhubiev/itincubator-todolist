import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistActionType = ReturnType<typeof changeTodolistAC>
export type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistFilterActionType |
    ChangeTodolistActionType

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.payload.todolistId)

        case 'ADD-TODOLIST': {
            const {todolistId, title} = action.payload
            return [{id: todolistId, title, filter: "all"}, ...todolists]
        }
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

export const removeTodolistAC = (todolistId: string) => (
    {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const
)

export const  addTodolistAC= (title: string) => (
    {type: 'ADD-TODOLIST', payload: {title, todolistId: v1()}} as const
)

export const  changeTodolistAC= (payload: {title: string, todolistId: string}) => (
    {type: 'CHANGE-TODOLIST-TITLE', payload} as const
)

export const  changeTodolistFilterAC= (payload: {filter: FilterValuesType, todolistId: string}) => (
    {type: 'CHANGE-TODOLIST-FILTER', payload} as const
)