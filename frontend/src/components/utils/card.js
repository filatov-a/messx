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
    Delete,
    AddComment,
    Source,
    AddReactionOutlined,
    AddReaction,
} from '@mui/icons-material'
import config from "../../config/config";
import * as rd from "react-router-dom";
import {sendCreateComment, sendDeletePost, sendSetLike} from "../../redux/modules/posts";
import * as rr from "react-redux";
// import {CustomTextField} from "../../styles/main";
import * as r from "react";
import CreatePost from "../posts/createPost";

const styles = {
    root: {
        marginLeft: '20px',
        marginRight: '20px',
        boxShadow: "2px 3px 10px black, 0 0 10px #a2a2a2 inset",
        background: 'rgba(0,30,60,0)',
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
        color: "#a2a2a2",
        textAlign: "justify",
        lineHeight: "25px",
        outline: 0,
        fontSize: 18,
        textOverflow: 'ellipsis',
    },
    textBlue: {
        fontFamily: "'Shadows Into Light', cursive",
        color: "rgb(51, 153, 255)",
        textAlign: "justify",
        lineHeight: "25px",
        outline: 0,
        fontSize: 18,
        textOverflow: 'ellipsis',
        margin: 0,
    },
    cardActions: {
        width: '100%',
        margin: "auto",
        // marginLeft: 3,
        // marginRight: 3,
        border: "1px solid rgb(51, 153, 255)",
        boxShadow: "2px 3px 10px black, 0 0 10px rgb(51, 153, 255) inset",
        borderRadius: 10
    },
    titleText: {
        color: "#a2a2a2",
        fontSize: 25,
        fontFamily: "blud"
    },
    up: {
        margin: "auto",
        width: "300px",
        borderRight: "0.1px solid yellow",
        borderLeft: "0.1px solid yellow",
        height: 40
    }
};

export const CustomCard = (props) => {
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();

    const [content, setContent] = r.useState('');

    const onChangeContent = (e) => setContent(e.target.value);

    const onClick = () => {
        navigate(`/posts/${props.post.id}`)
    }

    const onClickAvatar = () => {
        navigate(`/users/${props.post.userId}`)
    }

    const onClickCategory = () => {
        navigate(`/users/${props.post.userId}`)
    }

    const createPost = () => {
        dispatch(sendCreateComment({
            token: props.users.token,
            content: content,
            id: props.postId,
        }));
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

    if (props.create){
        return (
            <div>
                <div style={styles.up}> </div>
                <div style={styles.root}>
                    <CreatePost withoutTitle={true}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={styles.up}> </div>
            <Card style={styles.root}>
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
                        <Box display={'flex'} style={styles.textBlue}>
                            <div style={{flexGrow: 2}}>{props.post.createdAt}</div>
                            <div >{props.post.User.full_name}</div>
                        </Box>
                        <Box display='flex' style={styles.cardActions}>
                            <Box display={"flex"} style={{flexGrow: 9}}>
                                <Button onClick={onLike} size="small" color="primary">
                                    {props.post?.isLiked ? <AddReaction/> : <div/>}
                                    {!props.post?.isLiked ? <AddReactionOutlined/> : <div/>}
                                    {props.post?.likesCount ? props.post?.likesCount : ''}
                                </Button>
                                <Button onClick={onClick}>
                                    <AddComment/>
                                    {props.post?.answers?.length ? props.post?.answers?.length : ''}
                                </Button>
                                <Button>
                                    <Source/>
                                    {props.post?.questions?.length ? props.post?.questions?.length : ''}
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
                                            props.users?.user?.id === props.post?.User?.id) &&
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
