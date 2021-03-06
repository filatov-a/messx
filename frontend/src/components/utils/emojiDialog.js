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
import {Avatar, Box} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmojiDialog(props) {
    const {
        setOpen,
        open,
        onLike,
        post
    } = props;


    const onEmojiClick = (event, emojiObject) => {
        onLike(emojiObject.emoji);
        setOpen(false);
    };

    const onDelete = () => {
        onLike(post.userLike.type);
        setOpen(false);
    }

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
                {!post.userLike?.type &&
                    <div>
                        <DialogTitle>Emoji</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Picker onEmojiClick={onEmojiClick} pickerStyle={{margin: "auto", marginBottom: 20}}/>
                                <ListLikes post={post}/>
                            </DialogContentText>
                        </DialogContent>
                    </div>
                }
                {post.userLike?.type &&
                    <div>
                        <DialogTitle>
                            <Button
                                fullWidth
                                color={'secondary'}
                                variant={'outlined'}
                                onClick={onDelete}
                            >
                                Delete My Emoji
                            </Button>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <ListLikes post={post}/>
                            </DialogContentText>
                        </DialogContent>
                    </div>
                }
            </Dialog>
        </div>
    );
}

function ListLikes(props){
    const {post} = props
    const navigate = rd.useNavigate();
    return (
        <div style={{width:300}}>
            {post.LikesPosts.map(i => (
                <Box key={i.id} display={'flex'} style={{justifyContent:'space-between'}}>
                    <Button style={{fontSize: 30}}>{i.type}</Button>
                    <Button
                        onClick={()=>{navigate(`/users/${i.User.id}`);navigate(0)}}
                        style={{width:"100%"}}
                    >
                        <Box display={'flex'}>
                            <Box style={{margin: "auto", fontSize:15, width:100}}>
                                {i.User?.full_name}
                            </Box>
                            <Box>
                                <Avatar
                                    src={`${config.url}/images/${i.User?.profile_picture}`}
                                    style={{marginLeft: 50}}
                                />
                            </Box>

                        </Box>
                    </Button>
                </Box>
            ))}
        </div>
    )
}
