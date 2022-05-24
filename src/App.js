import {Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import ToastAlert from "./Components/design/ToastAlert";
import Main from "./Components/Main";
import TopBar from "./Components/TopBar";

function App({children}) {
    const [toast, setToast] = useState({show: false, status: "", message: ""});
    const Offset = styled("div")(({theme}) => theme.mixins.toolbar);


    return (
        <Paper elevation={20} className={"portraitWidescreen"}>
            <TopBar>{children}</TopBar>
            {
                toast.show
                &&
                <ToastAlert toast={toast} setToast={setToast}/>
            }
            <Offset/>
            <Main toast={toast} setToast={setToast}/>
        </Paper>
    );
}

export default App;