import React from "react";
import {Box} from '@mui/material';
import {sendGetAllPosts, sendGetUserPosts} from '../../redux/modules/posts'
import * as rr from "react-redux";
import * as r from "react";
import {CustomCard} from '../utils/card'
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {parseToken} from "../../utils/parseToken";
import InfiniteScroll from "react-infinite-scroll-component";
import * as rd from "react-router-dom";

const styles = {
    divPosts: {
        width: '90%',
        minWidth: '400px',
        margin: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
}

function posts() {
    const posts = rr.useSelector(state => state.posts);
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    const [page, setPage] = r.useState(0);

    r.useEffect(() => {
        if (posts.status === 'idle'){
            dispatch(sendGetAllPosts({token: users?.token, page}));
            setPage((prevPageNumber) => prevPageNumber + 1);
        }
    }, [dispatch])

    const trigger = () => {
        dispatch(sendGetAllPosts({token: users?.token, page}));
        setPage((prevPageNumber) => prevPageNumber + 1);
    }

    return (
        <Box>
            <h1 style={{color: "#a2a2a2"}}>Follow posts</h1>
            {users.user &&
            <Tooltip title="create post" arrow aria-label="add">
                <Link to={'/createpost'}>
                    <Fab color="primary" size="small">
                        <AddIcon />
                    </Fab>
                </Link>
            </Tooltip>
            }
            {posts.posts &&
            <div style={{width: "90%", margin: "auto"}}>
                <InfiniteScroll
                    dataLength={posts.posts.length}
                    next={trigger}
                    hasMore={posts.hasMore}
                    loader={<h4 style={{color: "#a2a2a2"}}>Loading...</h4>}
                >
                    { posts.posts.length &&
                        <Box style={styles.divPosts}>
                            {posts.posts.map( (i) => (
                                <div key={i.id}>
                                    <CustomCard
                                        cardActions={true}
                                        post={i}
                                        users={users}
                                    />
                                </div>
                            ))}
                        </Box>
                    }
                </InfiniteScroll>
            </div>
            }
        </Box>
    );
}

export default posts;
