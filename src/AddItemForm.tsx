import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {AddBox} from "@mui/icons-material";
import Box from "@mui/material/Box";

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
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <TextField
                label={error ? error : 'New Title'}
                error={!!error}
                id="outlined-basic"
                variant="outlined"
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
                value={itemTitle}
                size={"small"}
            />

            <IconButton onClick={addItemHandler} color={"primary"}>
                <AddBox/>
            </IconButton>

            {userTitleLengthWarning}
            {userEmptyTitleWarning}
        </Box>
    );
};