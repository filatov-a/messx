import React from "react";
import {sendDeleteUser} from '../../redux/modules/users';
import {
    sendGetPostById,
    sendSetLike,
    sendGetAllCategoriesFromPost,
    sendDeletePost
} from '../../redux/modules/posts';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, ButtonBase, Box, Button} from '@mui/material';
import config from '../../config/config';
import * as r from "react";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import {UseStyles} from '../../styles/specP';
import {parseToken} from '../../utils/parseToken';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import Comment from "./comment";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateComment from "./createComment";

function post() {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);
    const decode = parseToken(users.token)
    let isLiked = null, isDisliked = null;
    let isWriteColor = null;

    const [isWrite, setIsWrite] = r.useState(false);

    let clientId = '';
    if (decode) clientId = decode.id;

    r.useEffect(() => {
        if (posts.status === 'idle'){
            const param = {id: id, token: users.token, decode: decode}
            dispatch(sendGetPostById(param));
        }
    },[dispatch]);

    r.useEffect(() => {
        dispatch(sendGetAllCategoriesFromPost(id));
    },[dispatch]);

    if(posts.isLiked) isLiked = classes.clicked;
    if(posts.isDisliked) isDisliked = classes.clicked;

    if (isWrite) isWriteColor = classes.clicked;
    else isWriteColor = null;

    const handleDelete = () => {
        dispatch(sendDeletePost(id));
        navigate('/posts');
    }

    const handleSetLike = () => {
        if (!decode) return;
        const param = {id: id,
            token: users.token,
            type: 'like',
            decode: decode,
        }
        dispatch(sendSetLike(param));
        isDisliked = null; isLiked = null;
        if(posts.isLiked) isLiked = classes.clicked;
        if(posts.isDisliked) isDisliked = classes.clicked;
    }

    const handleSetDislike = (type) => {
        if (!decode) return;
        const param = {id: id,
            token: users.token,
            type: 'dislike',
            decode: decode,
        }
        dispatch(sendSetLike(param));
        isLiked = null; isDisliked = null;
        if(posts.isLiked) isLiked = classes.clicked;
        if(posts.isDisliked) isDisliked = classes.clicked;
    }

    const handleWrite = () => {setIsWrite(!isWrite)}

    return (
        <div>
            {posts.specPost &&
            <div>
                <div className={classes.post}>
                    <div className={classes.title}>
                        <h2>{posts.specPost.title}</h2>
                        <div className={classes.categories}>
                            {posts.categories &&
                            posts.categories.map(i => (
                                <ButtonBase href={`/categories/${i.id}`} key={i.id}>
                                    <p>{i.title}</p>
                                </ButtonBase>
                            ))
                            }
                        </div>
                        <div className={classes.underTitle}>
                            <p>publish date: {posts.specPost.publish_date}</p>
                            <p>status: {posts.specPost.status}</p>
                            {posts.user && posts.user.profile_picture &&
                            <ButtonBase href={`/users/${posts.specPost.userId}`} style={{borderRadius:'100%', padding:5}}>
                                <Avatar alt="Remy Sharp" src={`${config.url}/${posts.user.profile_picture}`} className={classes.img}/>
                            </ButtonBase>
                            }
                        </div>
                    </div>
                    <div className={classes.content}>
                        {posts.specPost.content}
                    </div>
                    <Box className={classes.actions} display='flex'>
                        <div>
                            {posts.likes &&
                            <i style={{marginRight: 5}}>{posts.likes.length}</i>
                            }
                            <ButtonBase className={isLiked} onClick={handleSetLike} style={{padding:4, borderRadius:100}}>
                                <ThumbUpOutlinedIcon/>
                            </ButtonBase>
                        </div>
                        <div>
                            {posts.dislikes &&
                            <i style={{marginRight: 5}}>{posts.dislikes.length}</i>
                            }
                            <ButtonBase className={isDisliked} onClick={handleSetDislike} style={{padding:4, borderRadius:100}}>
                                <ThumbDownOutlinedIcon/>
                            </ButtonBase>
                        </div>
                        <div>
                            <ButtonBase className={isWriteColor} onClick={handleWrite} style={{padding:4, borderRadius:100}}>
                                <RateReviewOutlinedIcon/>
                            </ButtonBase>
                        </div>
                        {users.user && (users.user.role === 'admin' || posts.specPost.userId === users.user.id) &&
                        <Button onClick={handleDelete} style={{fontSize:12}} variant='contained' color='secondary'>
                            <DeleteIcon fontSize='small'/>
                            delete
                        </Button>
                        }
                    </Box>
                </div>
                <h2>Comments</h2>
                {isWrite && <CreateComment/>}
                {posts.comments && posts.comments.length !== 0 &&
                <div style={{marginBottom:100}}>
                    {posts.comments.map(i => (
                        <div key={i.comment.id}>
                            <Comment
                                id={i.comment.id}
                                content={i.comment.content}
                                userId={i.comment.userId}
                                user={i.user}
                                publish_date={i.comment.publish_date}
                                isLiked={i.isLiked}
                                isDisliked={i.isDisliked}
                                likes={i.likes}
                                dislikes={i.dislikes}
                            />
                        </div>
                    ))}
                </div>
                }
            </div>
            }
        </div>
    )
}

export default post;
