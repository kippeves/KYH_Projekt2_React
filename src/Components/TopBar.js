import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuIcon from "@mui/icons-material/Menu";
import {Box, Button, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import {useState} from "react";

export default function TopBar({children}) {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const pages = ["Lägg till", "Se tidigare"];

    return (
        <AppBar position={"static"}>
            <Toolbar>
                <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: "block", md: "none"}
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{display: {xs: "none", md: "block"}}}
                >
                    <CalendarMonthIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 1,
                        mb: 0.8,
                        display: {xs: "none", md: "flex"},
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none"
                    }}
                >
                    TimeSavers
                </Typography>
                <Typography
                    variant="h6"
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                        flexGrow: 1,
                        display: {xs: "flex", md: "none"}
                    }}>
                    TimeSavers
                </Typography>
                <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={() => {}}
                            sx={{color: "white", display: "block"}}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>
                {children}
            </Toolbar>
        </AppBar>
    );
}