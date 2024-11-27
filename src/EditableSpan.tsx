import React, {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [itemTitle, setItemTitle] = React.useState(title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(itemTitle)
    }

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                variant={"outlined"}
                size={"small"}
                onBlur={offEditMode}
                onChange={changeItemTitleHandler}
                value={itemTitle}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{title}</span>


    );
};