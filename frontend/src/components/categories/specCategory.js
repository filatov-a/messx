import React from "react";
import {sendGetAllUsers} from '../../redux/modules/users';
import {
    sendDeletePost, sendGetAllPostsFromCategory
} from '../../redux/modules/posts';
import { sendGetCategoryById, sendDeleteCategory } from '../../redux/modules/categories';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, ButtonBase, Box, Button} from '@material-ui/core';
import * as r from "react";
import {UseStyles} from '../../styles/specP';
import {parseToken} from '../../utils/parseToken';
import DeleteIcon from "@material-ui/icons/Delete";
import {CustomCard} from '../extra/card'

function category() {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const categories = rr.useSelector(state => state.categories);
    const history = rd.useHistory();
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);
    const decode = parseToken(users.token)

    let clientId = '';
    if (decode) clientId = decode.id;

    r.useEffect(() => {
        if (posts.status === 'idle') dispatch(sendGetAllPostsFromCategory(id));
    }, [dispatch])

    r.useEffect(() => {
        dispatch(sendGetCategoryById(id));
    },[dispatch])

    const handleDelete = () => {
        dispatch(sendDeleteCategory({id: id, history: history}));
    }

    // console.log(posts);

    return (
        <div>
            {categories.specCategory &&
            <div>
                <div className={classes.post}>
                    <h2>{categories.specCategory.title}</h2>
                    <div className={classes.content}>
                        {categories.specCategory.description}
                    </div>
                    {users.user && (users.user.role === 'admin') &&
                    <Button onClick={handleDelete} style={{fontSize:12, marginBottom: 20}} variant='contained' color='secondary'>
                        <DeleteIcon fontSize='small'/>
                        delete
                    </Button>
                    }
                </div>
                <h2>Posts</h2>
                {posts.posts.length !== 0 && posts.posts[0].user &&
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
            </div>
            }
        </div>
    )
}

export default category;
