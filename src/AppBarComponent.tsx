import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import Switch from '@mui/material/Switch';

type AppBarComponentPropsType = {
    changeThemeMode: () => void
}

export function AppBarComponent ({changeThemeMode}: AppBarComponentPropsType) {
    const changeModeHandler = () => changeThemeMode()

    return (
        <Box position="relative" sx={{mb:'80px'}}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Switch onChange={changeModeHandler}/>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>logout</MenuButton>
                    <MenuButton>Faq</MenuButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}