import * as React from "react";
import {
    Card,
    Box,
    Avatar,
    Button,
    ButtonBase,
    CardMedia,
    CardActions,
    CardContent,
    Menu,
    MenuItem
} from '@mui/material';
import {
    AddReactionOutlined,
    ArrowDownward,
    ArrowUpward,
    MoreVert,
} from '@mui/icons-material'
import * as rd from "react-router-dom";
import {sendDeletePost, sendSetLike} from "../../redux/modules/posts";
import * as rr from "react-redux";
import * as r from "react";
import CreatePost from "../posts/createPost";
import config from "../../config/config";
import {stylesCart} from "../../styles/main";
import EmojiDialog from "./emojiDialog";

export const CustomCard = (props) => {
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [chosenEmojiOpen, setChosenEmojiOpen] = r.useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onDelete = () => {
        dispatch(sendDeletePost(props.post.id));
    };

    const onClickArrowDownward = () => {
        navigate(`/posts/${props.post.id}/questions`)
    }

    const onClickArrowUpward = () => {
        navigate(`/posts/${props.post.id}/answers`)
    }

    const onClickAvatar = () => {
        navigate(`/users/${props.post.userId}`)
        navigate(0)
    }

    const onClickEmoji = () => {
        setChosenEmojiOpen(!chosenEmojiOpen)
    }
    const access = () => {
        return (props.users?.user?.role === "admin" ||
            props.users?.user?.role === "superAdmin" ||
            props.users?.user?.id === props.post?.User?.id)
    }

    const onLike = async (emoji) => {
        await dispatch(sendSetLike({
            type: emoji,
            token: props.users.token,
            id: props.post.id
        }));
    }

    const onEdit = async () => {
        navigate(`/posts/${props.post.id}/update`)
    }

    const ButtonDiv = (prp) => {
        if (props.single) {
            return (
                <div style={stylesCart.link} >
                    {prp.children}
                </div>
            )
        } else {
            return (
                <Button style={stylesCart.link} onClick={onClickArrowDownward}>
                    {prp.children}
                </Button>
            )
        }
    }

    if (props.create){
        return (
            <div>
                <div style={stylesCart.up}> </div>
                <div style={stylesCart.root}>
                    <CreatePost withoutTitle={true} postId={props.postId}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={stylesCart.up}> </div>
            <Card style={stylesCart.root}>
                <ButtonDiv>
                    {props.image &&
                        <CardMedia
                            style={stylesCart.media}
                            image={props.image}
                            title="Contemplative Reptile"
                        />
                    }
                    <CardContent>
                        <div style={stylesCart.titleText}>
                            {props.post.title}
                        </div>
                        <div>
                            <div style={stylesCart.text} contentEditable="true">
                                {props.post.content}
                            </div>
                        </div>
                    </CardContent>
                </ButtonDiv>
                {props.cardActions &&
                    <CardActions style={{display: "block"}}>
                        <div style={{display: "flex", flexWrap: "wrap", marginBottom: 10}}>
                            {props.post.PostsCategories?.map(i=>(
                                <Category i={i}/>
                            ))}
                        </div>
                        <Box display={'flex'} style={stylesCart.textBlue}>
                            <Box display={'flex'} style={{flexGrow: 2}}>
                                <div>{props.post.createdAt}</div>
                                {props.post.createdAt !== props.post.updatedAt &&
                                    <div style={{color: "#a2a2a2", marginLeft: 10}}>edited</div>
                                }
                            </Box>
                            <div >{props.post.User.full_name}</div>
                        </Box>
                        <Box display='flex' style={stylesCart.cardActions}>
                            <Box display={"flex"} style={{flexGrow: 9}}>
                                <Button onClick={onClickEmoji}>
                                    <Box display={'flex'} style={{position:'absolute', margin: 'auto'}}>
                                        {props.post?.userLike ?
                                            <div style={{fontSize: 25}}>
                                                {props.post?.userLike.type}
                                            </div> :
                                            <AddReactionOutlined/>}
                                        <div style={{marginLeft: 5}}>
                                            {props.post.LikesPosts?.length ? props.post.LikesPosts?.length : ''}
                                        </div>
                                    </Box>
                                </Button>
                                <Button onClick={onClickArrowDownward}>
                                    <ArrowDownward/>
                                    {props.post?.questions?.length ? props.post?.questions?.length : ''}
                                </Button>
                                {(props.post?.answers?.length) ?
                                    <Button onClick={onClickArrowUpward}>
                                        <Box display={'flex'}>
                                            <ArrowUpward style={{color: 'yellow'}}/>
                                            <div style={{color: 'yellow'}}>{props.post?.answers?.length}</div>
                                        </Box>
                                    </Button> :
                                    <Button disabled>
                                        <ArrowUpward/>
                                    </Button>
                                }
                            </Box>
                            {props.post.User &&
                                <Box display={"flex"}>
                                    <ButtonBase onClick={onClickAvatar} style={{borderRadius:'100%', padding:10}}>
                                        <Avatar alt="Remy Sharp" src={`${config.url}/images/${props.post.User.profile_picture}`} style={{width: 30, height:30}}/>
                                    </ButtonBase>
                                    <Button onClick={handleClick}>
                                        <MoreVert style={{color: "#a2a2a2"}}/>
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        { access() &&
                                            <MenuItem onClick={onDelete}>Delete</MenuItem>
                                        }
                                        { access() &&
                                            <MenuItem onClick={onEdit}>Edit</MenuItem>
                                        }
                                        <MenuItem>Send</MenuItem>
                                    </Menu>
                                </Box>
                            }
                        </Box>
                    </CardActions>
                }
            </Card>
            <EmojiDialog
                open={chosenEmojiOpen}
                setOpen={setChosenEmojiOpen}
                onLike={onLike}
                post={props.post}
            />
        </div>
    );
}

function Category(props){
    const {i} = props;
    const navigate = rd.useNavigate();
    const onClick = () => {
        navigate(`/posts-categories/${i.id}`)
        navigate(0)
    }

    return (
        <div key={i.id}>
            <Button
                style={{margin: 5, textAlign: "center"}}
                onClick={onClick}
                variant={"outlined"}
                color="secondary"
            >
                {i.title}
            </Button>
        </div>
    )
}
