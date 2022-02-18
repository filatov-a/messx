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
} from '@mui/material';
import {
    FavoriteBorder,
    Favorite,
    HeartBrokenOutlined,
    HeartBroken,
    Delete,
} from '@mui/icons-material'
import config from "../../config/config";
import * as rd from "react-router-dom";
import {sendDeleteComment, sendSetLikeToComment} from "../../redux/modules/posts";
import * as rr from "react-redux";

const styles = {
    root: {
        // margin: '20px',
        // boxShadow: "2px 3px 10px black, 0 0 10px #a2a2a2 inset",
        background: 'rgb(0, 30, 60)',
        border: "1px solid rgb(51, 153, 255)",
        borderRadius: 10
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        width: "100%",
        height: "100%",
        textTransform: "none"
    },
    text: {
        // fontFamily: "'Shadows Into Light', cursive",
        color: "#a2a2a2",
        textAlign: "justify",
        lineHeight: "25px",
        outline: 0,
        fontSize: 18,
        textOverflow: 'ellipsis',
    },
    cardActions: {
        width: '100%',
        margin: "auto",
        borderTop: "2px dashed rgb(51, 153, 255)",
        // border: "1px solid #a2a2a2",
        // boxShadow: "0px 5px 5px rgb(51, 153, 255)",
    },
    titleText: {
        color: "#a2a2a2",
        fontSize: 25,
        fontFamily: "blud"
    },
    up: {
        margin: "auto",
        width: "80%",
        borderRight: "1px dashed yellow",
        borderLeft: "1px dashed yellow",
        height: 20
    }
};

export const CustomCardComment = (props) => {
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();

    const onClick = () => {
        navigate(`/comment/${props.comment.id}`)
    }

    const onClickAvatar = () => {
        navigate(`/users/${props.comment.userId}`)
    }

    const onLike = async () => {
        // if (props.decode.id !== id) {
        await dispatch(sendSetLikeToComment({
            type: "like",
            token: props.users.token,
            id: props.comment.id
        }));
        // }
    }

    const onDislike = async () => {
        // if (props.decode.id === id) {
        await dispatch(sendSetLikeToComment({
            type: "dislike",
            token: props.users.token,
            id: props.comment.id,
        }));
        // }
    }

    const onDelete = () => {
        dispatch(sendDeleteComment(props.comment.id));
    }

    const ButtonDiv = (prp) => {
        if (props.single) {
            return (
                <div style={styles.link} >
                    {prp.children}
                </div>
            )
        } else {
            return (
                <Button style={styles.link} onClick={onClick}>
                    {prp.children}
                </Button>
            )
        }
    }

    return (
        <div>
            <div style={styles.up}> </div>
            <Card style={styles.root} >
                <ButtonDiv>
                    <CardContent>
                        <div>
                            <div style={styles.text} contentEditable="true">
                                {props.comment.content}
                            </div>
                        </div>
                    </CardContent>
                </ButtonDiv>
                {props.cardActions &&
                    <CardActions style={{display: "block"}}>
                        <Box display='flex' style={styles.cardActions}>
                            <Box display={"flex"} style={{flexGrow: 7}}>
                                <Button onClick={onLike} size="small" color="primary">
                                    {props.comment?.isLiked ? <Favorite/> : <div/>}
                                    {!props.comment?.isLiked ? <FavoriteBorder/> : <div/>}
                                    {props.comment?.likesCount ? props.comment?.likesCount : ''}
                                </Button>
                                <Button onClick={onDislike} size="small" color="secondary">
                                    {props.comment?.isDisliked ? <HeartBroken/> : <div/>}
                                    {!props.comment?.isDisliked ? <HeartBrokenOutlined/> : <div/>}
                                    {props.comment?.dislikesCount ? props.comment?.dislikesCount : ''}
                                </Button>
                            </Box>
                            {props.comment?.User &&
                                <Box display={"flex"}>
                                    <ButtonBase onClick={onClickAvatar} style={{borderRadius:'100%', padding:10}}>
                                        <Avatar alt="Remy Sharp" src={`${config.url}/images/${props.comment.User.profile_picture}`} style={{width: 30, height:30}}/>
                                    </ButtonBase>
                                    {
                                        (props.users?.user?.role === "admin" ||
                                            props.users?.user?.role === "superAdmin" ||
                                            props.users?.user?.id === props.comment?.User?.id) &&
                                        <Button onClick={onDelete} size="small" color="secondary">
                                            <Delete/>
                                        </Button>
                                    }
                                </Box>
                            }
                        </Box>
                    </CardActions>
                }
            </Card>
        </div>
    );
}
