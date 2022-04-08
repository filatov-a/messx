import React from "react";
import {
    sendGetAllPosts,
    sendGetAllPostsFromCategory
} from '../../redux/modules/posts';
import { sendGetCategoryById, sendDeleteCategory } from '../../redux/modules/postsCategories';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Box, Button} from '@mui/material';
import * as r from "react";
import {parseToken} from '../../utils/parseToken';
import {CustomCard} from '../utils/card'
import InfiniteScroll from "react-infinite-scroll-component";

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

function category() {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const categories = rr.useSelector(state => state.postsCategories);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const id = rd.useParams().id;
    const decode = parseToken(users.token)
    // const [page, setPage] = r.useState(0);

    let clientId = '';
    if (decode) clientId = decode.id;

    r.useEffect(() => {
        dispatch(sendGetCategoryById(id));
        dispatch(sendGetAllPostsFromCategory({id, token: users.token}));
    }, [])

    // const handleDelete = () => {
    //     dispatch(sendDeleteCategory({id: id, navigate}));
    // }
    //
    // const trigger = () => {
    //     dispatch(sendGetAllPosts({token: users?.token, page}));
    //     setPage((prevPageNumber) => prevPageNumber + 1);
    // }
    return (
        <div>
            {categories.specCategory &&
            <div>
                <div>
                    <h2 style={{color: "#a2a2a2"}}>
                        {categories.specCategory.title}
                    </h2>
                    {/*{users.user && (users.user.role === 'admin') &&*/}
                    {/*<Button onClick={handleDelete} style={{fontSize:12, marginBottom: 20}} variant='contained' color='secondary'>*/}
                    {/*    <DeleteIcon fontSize='small'/>*/}
                    {/*    delete*/}
                    {/*</Button>*/}
                    {/*}*/}
                </div>
                {posts.posts &&
                    <div style={{width: "90%", margin: "auto"}}>
                        {/*<InfiniteScroll*/}
                        {/*    dataLength={posts.posts.length}*/}
                        {/*    next={trigger}*/}
                        {/*    hasMore={posts.hasMore}*/}
                        {/*    loader={<h4 style={{color: "#a2a2a2"}}>Loading...</h4>}*/}
                        {/*>*/}
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
                        {/*</InfiniteScroll>*/}
                    </div>
                }
            </div>
            }
        </div>
    )
}

export default category;
