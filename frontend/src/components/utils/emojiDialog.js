import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import config from "../../config/config";
import * as rd from "react-router-dom";
import Picker from "emoji-picker-react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmojiDialog(props) {
    const {setOpen, open, chosenEmoji, setChosenEmoji, onLike} = props;

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject.emoji);
        onLike(emojiObject.emoji);
        setOpen(false);
    };

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
                <DialogTitle>Emoji</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Picker onEmojiClick={onEmojiClick}/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
