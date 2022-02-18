import React from "react";
import {
    sendGetPostById,
    sendSetLike,
    sendDeletePost
} from '../../redux/modules/posts';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, ButtonBase, Box, Button} from '@mui/material';
import {
    FavoriteBorder,
    Favorite,
    HeartBrokenOutlined,
    HeartBroken,
    RateReviewOutlined,
} from '@mui/icons-material'
import config from '../../config/config';
import * as r from "react";
import {parseToken} from '../../utils/parseToken';
// import Comment from "./comment";
// import CreateComment from "./createComment";
import {CustomCard} from '../utils/card'
import {CustomCardComment} from '../utils/cardComment'

function post() {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const {id} = rd.useParams();
    const decode = parseToken(users.token)

    const [isWrite, setIsWrite] = r.useState(false);

    r.useEffect(() => {
        const param = {id: id, token: users.token, decode: decode}
        dispatch(sendGetPostById(param));
    },[]);

    const handleWrite = () => {setIsWrite(!isWrite)}

    return (
        <div>
            {posts.specPost &&
                <CustomCard
                    cardActions={true}
                    post={posts.specPost}
                    users={users}
                    posts={posts}
                    decode={decode}
                    single={true}
                />
            }
            {posts.specPost?.Comments && posts.specPost.Comments.length !== 0 &&
                <div style={{width: "60%", margin: "auto"}}>
                    {posts.specPost.Comments.map(i => (
                        <CustomCardComment
                            key={i.id}
                            cardActions={true}
                            comment={i}
                            users={users}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default post;
