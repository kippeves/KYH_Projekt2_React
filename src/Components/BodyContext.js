import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {createTheme, IconButton, ThemeProvider, useTheme} from "@mui/material";
import {createContext, useContext, useMemo, useState} from "react";
import App from "../App";


const ColorModeContext = createContext({toggleColorMode: () => {}});


const LightSwitch = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <>
            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === "dark" ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
        </>
    );
};

export default function BodyContext() {
    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            }
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode
                }
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <App>
                    <LightSwitch/>
                </App>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}