import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import {styled} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

const StyledToolbar = styled(Toolbar)(({
    display: "flex",
    justifyContent: "center"
}));

const StyledFab = styled(Fab)(({theme}) => ({
    zIndex: 1,
    top: 45,
    padding: "40px",
    margin: theme.spacing(1)
}));

export default function TopBar({currentView, onPageClick}) {

    const changePage = (page) => {
        return onPageClick(page);
    };

    return (
        <AppBar position={"static"} color={""}>
            <StyledToolbar>
                <StyledFab color="primary" aria-label="add" onClick={() => changePage("form")}>
                    <AddIcon fontSize={"large"}/>
                </StyledFab>
                <StyledFab color="primary" aria-label="add" onClick={() => changePage("calendar")}>
                    <CalendarMonthIcon fontSize={"large"}/>
                </StyledFab>
            </StyledToolbar>
        </AppBar>
    );
}