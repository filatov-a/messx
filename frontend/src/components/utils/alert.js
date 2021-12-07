import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import * as r from "react";
import {clearMess} from "../../redux/modules/users";

export default function TransitionAlerts(props) {
    const [open, setOpen] = React.useState(true);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function off(){
        setOpen(false);
        await sleep(500)
        props.dispatch(clearMess());
    }

    r.useEffect(() => {
        const timer = setTimeout( off, 3.5 * 1000 );
        return () => clearTimeout(timer);
    },[])

    return (
        <Box sx={{ width: '100%' }} style={{overflow: 'hidden'}}>
            <Slide in={open} direction="left">
                <Alert
                    severity={props.severity}
                    // variant="outlined"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={off}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {props.text}
                </Alert>
            </Slide>
        </Box>
    );
}
