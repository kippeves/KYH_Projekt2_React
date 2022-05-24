import CloseIcon from "@mui/icons-material/Close";
import {Fade} from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

export default function ToastAlert({toast, setToast}) {
    return (
        <Box sx={{width: "100%", position: "absolute", top: 50}}>
            <Fade in={toast.show}>
                <Alert
                    variant="filled" severity={toast.status}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setToast(false, "", "");
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    {
                        toast.message
                    }
                </Alert>
            </Fade>
        </Box>
    );
}