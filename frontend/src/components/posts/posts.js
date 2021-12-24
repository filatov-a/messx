import React from "react";
import {Box} from '@mui/material';
import {Pagination} from '@mui/material';
import {sendGetAllPosts, sendGetPostById} from '../../redux/modules/posts'
import { sendGetAllUsers, sendGetUserById} from '../../redux/modules/users'
import * as rr from "react-redux";
import * as r from "react";
import {CustomCard} from '../utils/card'
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {parseToken} from "../../utils/parseToken";

function posts() {
    const posts = rr.useSelector(state => state.posts);
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    const [decode, setDecode] = r.useState(null);

    r.useEffect(() => {
        if (posts.status === 'idle'){
            setDecode(parseToken(users.token))
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
                <div>
                    {posts.posts.map(i => (
                        <CustomCard
                            key={i.id}
                            cardActions={true}
                            post={i}
                            users={users}
                            decode={decode}
                            page={posts.page}
                        />
                    ))}
                </div>
            }
            {posts > 10 &&
            <div style={{margin: 20}}>
                <Pagination count={Math.ceil(posts.count/10)} page={posts.page} onChange={handleChange} variant="outlined" color="primary" />
            </div>
            }
        </Box>
    );
}

export default posts;
