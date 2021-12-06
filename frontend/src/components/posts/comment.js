import React from "react";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, ButtonBase, Box, Button} from '@mui/material';
import config from '../../config/config';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import {UseStyles} from '../../styles/specP';
import {parseToken} from '../../utils/parseToken';
import {sendDeleteComment, sendSetLikeToComment, sendGetPostById} from '../../redux/modules/posts';
import DeleteIcon from "@material-ui/icons/Delete";
import * as r from "react";

function comment(props) {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);
    const decode = parseToken(users.token);
    let isLiked = null, isDisliked = null;
    const likes = props.likes;
    const dislikes = props.dislikes;

    if(props.isLiked) isLiked = classes.clicked;
    if(props.isDisliked) isDisliked = classes.clicked;

    const handleSetLike = () => {
        if (!decode) return;
        console.log(posts.comments)
        const param = {id: props.id,
            postId: id,
            token: users.token,
            type: 'like',
            decode: decode,
            comments: posts.comments
        }
        dispatch(sendSetLikeToComment(param));
        isDisliked = null; isLiked = null;
        if(props.isLiked) isLiked = classes.clicked;
        if(props.isDisliked) isDisliked = classes.clicked;
    }

    const handleSetDislike = (type) => {
        if (!decode) return;
        const param = {id: props.id,
            token: users.token,
            postId: id,
            type: 'dislike',
            decode: decode,
            comments: posts.comments
        }
        dispatch(sendSetLikeToComment(param));
        isLiked = null; isDisliked = null;
        if(props.isLiked) isLiked = classes.clicked;
        if(props.isDisliked) isDisliked = classes.clicked;
    }

    const handleDelete = () => {
        dispatch(sendDeleteComment(props.id));
    }

    return (
        <div className={classes.comment}>
            <div className={classes.title}>
                <div className={classes.underTitle}>
                    <p className={classes.underP}>publish date: {props.publish_date}</p>
                    {props.user &&
                    <ButtonBase href={`/users/${props.id}`} style={{borderRadius:'100%', padding:5}}>
                        <Avatar alt="Remy Sharp" src={`${config.url}/${props.user.profile_picture}`} className={classes.img}/>
                    </ButtonBase>
                    }
                </div>
            </div>
            <div className={classes.content}>
                {props.content}
            </div>
            <Box className={classes.actions} display='flex'>
                <div>
                    {likes &&
                    <i style={{marginRight: 5}}>{likes.length}</i>
                    }
                    <ButtonBase className={isLiked} onClick={handleSetLike} style={{padding:4, borderRadius:100}}>
                        <ThumbUpOutlinedIcon/>
                    </ButtonBase>
                </div>
                <div>
                    {dislikes &&
                    <i style={{marginRight: 5}}>{dislikes.length}</i>
                    }
                    <ButtonBase className={isDisliked} style={{padding:4, borderRadius:100}} onClick={handleSetDislike}>
                        <ThumbDownOutlinedIcon/>
                    </ButtonBase>
                </div>
                {users.user && (users.user.role === 'admin' || props.userId === users.user.id) &&
                <Button onClick={handleDelete} style={{fontSize:12}} variant='outlined' color='secondary'>
                    <DeleteIcon fontSize='small'/>
                    delete
                </Button>
                }
            </Box>
        </div>
    )
}

export default comment;
