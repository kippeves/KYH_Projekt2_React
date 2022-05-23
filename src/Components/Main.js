import React, {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {Container, Fab} from "@mui/material";
import CalendarView from "./CalendarView";
import Form from "./Form";

const Main = () => {

    const [timeRegisterList, setTimeRegisterList] = useState([]);
    const [timeRegister, setTimeRegister] = useState("");

    return (
        <Container>
            <Form/>
            <Fab
                size={"large"}
                sx={{
                    position: "absolute",
                    bottom: 50,
                    right: 50
                }} aria-label="Lägg till" color={"primary"}>
                <AddIcon/>
            </Fab>
        </Container>
    );
};

export default Main;