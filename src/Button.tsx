import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    classes?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, isDisabled, onClickHandler, classes, ...props}: ButtonPropsType) => {
    return <button className={classes} disabled={isDisabled} onClick={onClickHandler}>{title}</button>
}