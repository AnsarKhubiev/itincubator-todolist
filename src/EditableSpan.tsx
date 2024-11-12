import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string)=> void
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
            ? <input
                onBlur={offEditMode}
                onChange={changeItemTitleHandler}
                value={itemTitle}
                autoFocus={true}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>


    );
};