import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {IconButton, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

export default function TopBar() {

    return (
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 1 }}
                >
                    <CalendarMonthIcon/>
                </IconButton>
                <Typography
                    variant="h6"

                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none"
                    }}>
                    TimeSavers
                </Typography>
            </Toolbar>
        </AppBar>
    );
}