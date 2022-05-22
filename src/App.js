import {Box, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import Main from "./Components/Main";
import TopBar from "./Components/TopBar";

function App() {
    const [currentView, setCurrentView] = useState("form");
    const Offset = styled("div")(({theme}) => theme.mixins.toolbar);

    const changePage = (page) => {
        setCurrentView(page);
    };

    return (
        <Box className={"portraitWidescreen"}>
            <TopBar currentView={currentView} onPageClick={changePage}/>
            <Offset/>
            <Paper elevation={3}>
                <Main currentView={currentView}/>
            </Paper>
        </Box>
    );
}

export default App;
