import React from "react";
import {
    sendGetPostById,
    sendSetLike,
    sendDeletePost
} from '../../redux/modules/posts';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from '../../utils/parseToken';
import {CustomCard} from '../utils/card'


function post() {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const {id} = rd.useParams();
    const decode = parseToken(users.token)

    r.useEffect(() => {
        const param = {id: id, token: users.token, decode: decode}
        dispatch(sendGetPostById(param));
    },[]);

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
            <div style={{width: 380, margin: "auto"}}>
                <CustomCard create={true} users={users} postId={id}/>
            </div>
            {posts.specPost?.questions && posts.specPost.questions.length !== 0 &&
                <div style={{width: "85%", margin: "auto"}}>
                    {posts.specPost.questions.map(i => (
                        <CustomCard
                            cardActions={true}
                            post={i}
                            users={users}
                            posts={posts}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default post;
