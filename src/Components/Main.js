import {Box} from "@mui/material";
import React, {useEffect} from "react";
import EventCalendar from "./EventCalendar";
import Form from "./Form";

const Main = ({currentView}) => {
    const Title = "TimeSavers: "

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (currentView){
            case 'form':
                document.title = Title+"Lägg till nya tider"
                break;
            case 'calendar':
                document.title = Title+"Se tidigare tidsregistreringar"
                break;
        }
    }, [currentView]);


    return (
        <Box padding={4}>
            {currentView==='form' && <Form/>
            }
            {currentView==='calendar' && <EventCalendar/>}
        </Box>
    );
};

export default Main;