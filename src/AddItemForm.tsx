import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {

    const [itemTitle, setItemTitle] = React.useState("")
    const [error, setError] = useState<string | null>(null)

    const isAddBtnDisabled = !itemTitle.length || itemTitle.trim().length > 15
    const userTitleLengthWarning = itemTitle.trim().length > 15 && <div>Recommended task title is 15 charters</div>
    const userEmptyTitleWarning = error && <div>"Please enter title"</div>

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (itemTitle.length <= 15) e.key === "Enter" && addItemHandler()
    }

    const addItemHandler = () => {
        setItemTitle("")
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input
                onKeyUp={addItemOnKeyUpHandler}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                className={error ? "inputError" : ""}
            />

            <Button
                onClickHandler={addItemHandler}
                title="+"
                isDisabled={isAddBtnDisabled}
            />
            {userTitleLengthWarning}
            {userEmptyTitleWarning}
        </div>
    );
};