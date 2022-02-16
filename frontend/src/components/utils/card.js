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
    Delete
} from '@mui/icons-material'
import config from "../../config/config";
import * as rd from "react-router-dom";
import {sendDeletePost, sendSetLike} from "../../redux/modules/posts";
import * as rr from "react-redux";

const styles = {
    root: {
        margin: '20px',
        boxShadow: "2px 3px 10px black, 0 0 10px #a2a2a2 inset",
        background: 'rgb(0, 30, 60)',
        border: "1px solid #a2a2a2",
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
        borderTop: "2px dashed #a2a2a2",
        // border: "1px solid #a2a2a2",
        boxShadow: "0px 5px 5px rgb(51, 153, 255)",
    },
    titleText: {
        color: "#a2a2a2",
        fontSize: 25,
        fontFamily: "blud"
    }
};

export const CustomCard = (props) => {
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();

    const onClick = () => {
        navigate(`/posts/${props.post.id}`)
    }

    const onClickAvatar = () => {
        navigate(`/users/${props.post.userId}`)
    }

    const onClickCategory = () => {
        navigate(`/users/${props.post.userId}`)
    }

    const onLike = async () => {
        // if (props.decode.id !== id) {
        await dispatch(sendSetLike({
            type: "like",
            token: props.users.token,
            id: props.post.id
        }));
        // }
    }

    const onDislike = async () => {
        // if (props.decode.id === id) {
        await dispatch(sendSetLike({
            type: "dislike",
            token: props.users.token,
            id: props.post.id,
        }));
        // }
    }

    const onDelete = () => {
        dispatch(sendDeletePost(props.post.id));
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
        <Card style={styles.root} >
            <ButtonDiv>
                {props.image &&
                <CardMedia
                    style={styles.media}
                    image={props.image}
                    title="Contemplative Reptile"
                />
                }
                <CardContent>
                    <div style={styles.titleText}>
                        {props.post.title}
                    </div>
                    <div>
                        <div style={styles.text} contentEditable="true">
                            {props.post.content}
                        </div>
                    </div>
                </CardContent>
            </ButtonDiv>
            {props.cardActions &&
            <CardActions style={{display: "block"}}>
                <div style={{display: "flex", flexWrap: "wrap", marginBottom: 10}}>
                    {props.post.PostsCategories?.map(i=>(
                        <Button style={{margin: 5, textAlign: "center"}} onClick={onClickCategory} variant={"outlined"} color="secondary">
                            {i.title}
                        </Button>
                    ))}
                </div>
                <Box display='flex' style={styles.cardActions}>
                    <Box display={"flex"} style={{flexGrow: 7}}>
                        <Button onClick={onLike} size="small" color="primary">
                            {props.post?.isLiked ? <Favorite/> : <div/>}
                            {!props.post?.isLiked ? <FavoriteBorder/> : <div/>}
                            {props.post?.likesCount ? props.post?.likesCount : ''}
                        </Button>
                        <Button onClick={onDislike} size="small" color="secondary">
                            {props.post?.isDisliked ? <HeartBroken/> : <div/>}
                            {!props.post?.isDisliked ? <HeartBrokenOutlined/> : <div/>}
                            {props.post?.dislikesCount ? props.post?.dislikesCount : ''}
                        </Button>
                    </Box>
                    {props.post.User &&
                    <Box display={"flex"}>
                        <ButtonBase onClick={onClickAvatar} style={{borderRadius:'100%', padding:10}}>
                            <Avatar alt="Remy Sharp" src={`${config.url}/images/${props.post.User.profile_picture}`} style={{width: 30, height:30}}/>
                        </ButtonBase>
                        {
                            (props.users?.user?.role === "admin" ||
                            props.users?.user?.role === "superAdmin" ||
                            props.users?.user?.id === props.users?.specUser?.id) &&
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
    );
}
