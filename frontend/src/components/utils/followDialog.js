import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Avatar, Box} from "@mui/material";
import config from "../../config/config";
import * as rd from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const {setOpen, open, title} = props;
    const navigate = rd.useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.follow && props.follow.length !== 0 &&
                            <Box display='flex'>
                                {props.follow.map(i => (
                                    <Box key={i.id} display={'flex'} style={{margin: "auto",}}>
                                        <Button onClick={()=>{navigate(`/users/${i.id}`); navigate(0)}}>
                                            <Box display={'flex'}>
                                                <Box style={{margin: "auto", fontSize:15}}>
                                                    {i.full_name}
                                                </Box>
                                                <Avatar
                                                    src={`${config.url}/images/${i.profile_picture}`}
                                                    style={{marginLeft: 50}}
                                                />
                                            </Box>
                                        </Button>
                                        {/*<Button variant={"outlined"} style={{marginLeft: 10}}>follow</Button>*/}
                                    </Box>
                                ))}
                            </Box>
                        }
                    </DialogContentText>
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button>Follow</Button>*/}
                {/*    <Button>Followers</Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}
