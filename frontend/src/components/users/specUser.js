import React from "react";
import {sendGetUserById, sendFollowUser} from '../../redux/modules/users';
import {sendGetUserPosts} from '../../redux/modules/posts';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from '../../utils/parseToken';
import {Avatar, Box, Button, ButtonBase, Grid} from "@mui/material";
import config from "../../config/config";
import {Settings, Star, StarOutline} from "@mui/icons-material";
import {CustomCard} from "../utils/card";
import useMediaQuery from '@mui/material/useMediaQuery';
import FollowDialog from "../utils/followDialog"
import InfiniteScroll from "react-infinite-scroll-component";

let styles = {
    personalInformationBig: {
        width: '80%',
        minWidth: '400px',
        margin: 'auto',
        marginTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    personalInformationSmall: {
        width: '90%',
        minWidth: '400px',
        margin: 'auto',
        marginTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    divPostsBig: {
        width: 700,
        minWidth: '400px',
        margin: 'auto',
        // border: "1px solid black",
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    divPostsSmall: {
        width: 500,
        minWidth: '400px',
        margin: 'auto',
        // border: "1px solid black",
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    divAvatarUserBig: {
        display: "flex",
        alignItems: "center",
    },
    divAvatarUserSmall: {
        display: "block",
    },
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 20,
        color: "rgb(51, 153, 255)"
    },
    avatarBig: {
        width: '300px',
        height: '300px',
        marginRight: 3,
        marginBottom: 0,
    },
    avatarSmall: {
        width: '100px',
        height: '100px',
        marginRight: 0,
        marginBottom: 0,
    },
    grayText: {
        color: "#a2a2a2",
        font: "italic small-caps bold 15px/2 cursive",
    },
    headText: {
        color: "rgb(51, 153, 255)",
        marginTop: 5,
        fontSize: 30,
    },
    handleText: {
        color: "rgb(51, 153, 255)",
        margin: 20,
        fontSize: 20,
        borderRadius: 100,
        width: 80,
        textTransform: "none"
    },
    line: {
        width: "100%",
        height: 10,
        borderBottom: "0.1px solid #a2a2a2"
    },
    textBlue: {
        fontFamily: "'Shadows Into Light', cursive",
        color: "rgb(51, 153, 255)",
        lineHeight: "25px",
        fontSize: 18,
        margin: "auto",
    },
}

const loadingMarkup = (
    <div className="py-4 text-center">
        <h3>Loading..</h3>
    </div>
)


function Account() {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const id = rd.useParams().id;
    const matches = useMediaQuery('(min-width:1200px)');

    const [decode, setDecode] = r.useState(null);
    const [page, setPage] = r.useState(0);
    const [openFollow, setOpenFollow] = r.useState(false);
    const [openFollowers, setOpenFollowers] = r.useState(false);

    r.useEffect(() => {
        console.log({id})
        dispatch(sendGetUserById({id, token: users?.token}));
        dispatch(sendGetUserPosts({id, token: users?.token, page}));
        setPage((prevPageNumber) => prevPageNumber + 1);
    },[]);

    r.useEffect(() => {
        setDecode(parseToken(users.token))
    },[]);


    const trigger = () => {
        dispatch(sendGetUserPosts({id, token: users?.token, page: page}));
        setPage((prevPageNumber) => prevPageNumber + 1);
    }

    const handleInfo = () => {
        navigate(`/users/${id}/info`)
    }

    const handleFollowToUser = () => {
        dispatch(sendFollowUser({id, token: users?.token}));
    }

    const handleFollow = () => {
        setOpenFollow(true);
    }

    const handleFollowers = () => {
        setOpenFollowers(true);
    }

    if (!matches) {
        styles.avatar = styles.avatarSmall
        styles.personalInformation = styles.personalInformationSmall
        styles.divAvatarUser = styles.divAvatarUserSmall
        styles.divPosts = styles.divPostsSmall
    } else {
        styles.avatar = styles.avatarBig
        styles.personalInformation = styles.personalInformationBig
        styles.divAvatarUser = styles.divAvatarUserBig
        styles.divPosts = styles.divPostsBig
    }

    return (
        <div>
            {users.specUser &&
            <div>
                <div style={styles.personalInformation}>
                    <Box style={styles.box}>
                        <Box style={styles.divAvatarUser}>
                            <Avatar
                                src={`${config.url}/images/${users.specUser.profile_picture}`}
                                sx={styles.avatar}
                            />
                            <div>
                                <div style={styles.headText}>{users.specUser.full_name}</div>
                                <div style={styles.grayText}>{users.specUser.id}</div>
                            </div>
                        </Box>
                        <div>
                            <Box style={styles.box}>
                                { users.specUser.followers &&
                                    <ButtonBase style={styles.handleText} onClick={handleFollowers}>
                                        {`stars ${users.specUser.followers.length}`}
                                    </ButtonBase>
                                }
                                {users.specUser.following &&
                                    <ButtonBase style={styles.handleText} onClick={handleFollow}>
                                        {`stared ${users.specUser.following.length}`}
                                    </ButtonBase>
                                }
                                <ButtonBase style={styles.handleText}>
                                    {`rating ${users.specUser.rating}`}
                                </ButtonBase>
                            </Box>
                            <Box>
                                {users.specUser &&
                                    <Button style={styles.button} onClick={handleFollowToUser} variant='outlined'>
                                        { users.specUser.userFollower ?
                                            <Star style={{color: "yellow"}}/> :
                                            <StarOutline/>
                                        }
                                    </Button>
                                }
                                {users.specUser &&
                                    <Button style={styles.button} variant='outlined'>
                                        direct
                                    </Button>
                                }
                                {
                                    (users.user?.role === "admin" ||
                                    users.user?.role === "superAdmin" ||
                                    decode?.id===users.specUser.id) &&
                                    <Button style={styles.button} onClick={handleInfo} variant='outlined'>
                                        <Settings/>
                                    </Button>
                                }
                            </Box>
                        </div>
                    </Box>
                </div>
                <div style={styles.textBlue}>
                    { users.specUser.userFollow ?
                        "your follower" :
                        ""
                    }
                </div>
                <div style={styles.line}> </div>
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
                <FollowDialog title={"Followers"} follow={users.specUser.followers} setOpen={setOpenFollowers} open={openFollowers}/>
                <FollowDialog title={"Follow"} follow={users.specUser.following} setOpen={setOpenFollow} open={openFollow}/>
            </div>
            }
        </div>
    )
}

export default Account;
