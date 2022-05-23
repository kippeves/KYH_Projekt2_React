import {Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import Main from "./Components/Main";
import TopBar from "./Components/TopBar";

function App() {
    const Offset = styled("div")(({theme}) => theme.mixins.toolbar);
    const Title = "TimeSavers: ";

    return (
        <Paper elevation={8} className={"portraitWidescreen"}>
            <TopBar/>
            <Offset/>
            <Main/>
        </Paper>
    );
}

export default App;
