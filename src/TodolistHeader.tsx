import {TodolistTitlePropsType} from "./Todolist";

export const TodolistHeader = ({title}: TodolistTitlePropsType) => {
    return (
        <h3>{title}</h3>
    )
}