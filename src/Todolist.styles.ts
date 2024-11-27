import {SxProps} from "@mui/material";

export const filterButtonsContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}

export const getListItemSx = (isDone: boolean): SxProps => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        p:0,
        opacity: isDone ? 0.5 : 1
    }
}