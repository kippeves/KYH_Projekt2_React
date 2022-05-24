import {Container} from "@mui/material";
import React from "react";
import Form from "./Form";

const Main = ({toast, setToast}) => {
    return (
        <Container>
            <Form toast={toast} setToast={setToast}/>
        </Container>
    );
};

export default Main;