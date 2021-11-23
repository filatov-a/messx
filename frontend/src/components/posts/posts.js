import React from "react";
import {Box} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {sendGetAllPosts, sendGetPostById} from '../../redux/modules/posts'
import { sendGetAllUsers, sendGetUserById} from '../../redux/modules/users'
import * as rr from "react-redux";
import * as r from "react";
import {CustomCard} from '../extra/card'
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function posts() {
    const posts = rr.useSelector(state => state.posts);
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();

    r.useEffect(() => {
        if (posts.status === 'idle'){
            dispatch(sendGetAllPosts({page: 1}));
        }
    }, [dispatch])

    const handleChange = (event, value) => {
        dispatch(sendGetAllPosts({page: value}));
    }

    return (
        <Box>
            <h1>Posts</h1>
            {users.user &&
            <Tooltip title="create post" aria-label="add">
                <Link to={'/createpost'}>
                    <Fab color="primary" size="small">
                        <AddIcon />
                    </Fab>
                </Link>
            </Tooltip>
            }
            {posts.posts && posts.posts.length !== 0 &&
                <Box>
                    {posts.posts.map(i => (
                        <div key={i.post.id}>
                            <CustomCard
                                title={i.post.title}
                                content={i.post.content}
                                to={`/posts/${i.post.id}`}
                                author={i.user.profile_picture}
                                userId={i.post.userId}
                                votes={i.votes}
                                answers={i.answers}
                            />
                        </div>
                    ))}
                </Box>
            }
            {posts.count > 10 &&
            <div style={{margin: 20}}>
                <Pagination count={Math.ceil(posts.count/10)} page={posts.page} onChange={handleChange} variant="outlined" color="primary" />
            </div>
            }
        </Box>
    );
}

export default posts;
