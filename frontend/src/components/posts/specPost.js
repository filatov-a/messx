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


function post(props) {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    // const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const {id} = rd.useParams();

    r.useEffect(() => {
        const param = {id: id, token: users.token}
        dispatch(sendGetPostById(param));
    },[]);

    return (
        <div>
            {props.isAnswers &&
                <div>
                    {(posts.specPost?.answers && posts.specPost.answers.length !== 0) ?
                        <div style={{width: "85%", margin: "auto"}}>
                            {posts.specPost.answers.map(i => (
                                <CustomCard
                                    cardActions={true}
                                    post={i}
                                    users={users}
                                    posts={posts}
                                />
                            ))}
                        </div> :
                        <h3 style={{color:'#a2a2a2'}}>
                            No sources
                        </h3>
                    }
                </div>
            }
            {posts.specPost &&
                <CustomCard
                    cardActions={true}
                    post={posts.specPost}
                    users={users}
                    posts={posts}
                    single={true}
                />
            }
            {props.isQuestions &&
                <div>
                    <div style={{width: 380, margin: "auto"}}>
                        <CustomCard create={true} users={users} postId={id}/>
                    </div>
                    {(posts.specPost?.questions && posts.specPost.questions.length !== 0) ?
                        <div style={{width: "85%", margin: "auto"}}>
                            {posts.specPost.questions.map(i => (
                                <CustomCard
                                    cardActions={true}
                                    post={i}
                                    users={users}
                                    posts={posts}
                                />
                            ))}
                        </div> :
                        <h3 style={{color:'#a2a2a2'}}>
                            No questions
                        </h3>
                    }
                </div>
            }

        </div>
    )
}

export default post;
