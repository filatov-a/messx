import React from "react";
import {sendGetUserById} from '../../redux/modules/users';
import {sendGetUserPosts} from '../../redux/modules/posts';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from '../../utils/parseToken';
import {Avatar, Box, Button, ButtonBase} from "@mui/material";
import config from "../../config/config";
import {Settings, StarOutline} from "@mui/icons-material";
import {CustomCard} from "../utils/card";
import UseMediaQuery from '@mui/material/useMediaQuery';

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
        width: '70%',
        minWidth: '400px',
        margin: 'auto',
        // border: "1px solid black",
        marginTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    divPostsSmall: {
        width: '90%',
        minWidth: '400px',
        margin: 'auto',
        // border: "1px solid black",
        marginTop: 40,
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
        font: "italic small-caps bold 24px/2 cursive"
    },
    headText: {
        marginTop: 5,
        fontSize: 30,
    },
    handleText: {
        margin: 20,
        fontSize: 20,
        borderRadius: 100,
        width: 80,
        textTransform: "none"
    },
    line: {
        width: "100%",
        height: 10,
        borderBottom: "1px solid #a2a2a2"
    },
}

function account() {
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const id = rd.useParams().id;
    const matches = UseMediaQuery('(min-width:1200px)');

    const [decode, setDecode] = r.useState(null);

    r.useEffect(() => {
        dispatch(sendGetUserById({id}));
        dispatch(sendGetUserPosts({id, token: users?.token}));
    },[]);

    r.useEffect(() => {
        setDecode(parseToken(users.token))
    },[]);

    const handleInfo = () => {
        if (decode.id === id) {
            navigate(`/users/${users.specUser.id}/info`)
        }
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
                                <div style={styles.grayText}>{users.specUser.username}</div>
                            </div>
                        </Box>
                        <div>
                            <Box style={styles.box}>
                                { users.specUser.followers &&
                                <ButtonBase style={styles.handleText}>
                                    {`stars ${users.specUser.followers.length}`}
                                </ButtonBase>
                                }
                                {users.specUser.follow &&
                                <ButtonBase style={styles.handleText}>
                                    {`stared ${users.specUser.follow.length}`}
                                </ButtonBase>
                                }
                                <ButtonBase style={styles.handleText}>
                                    {`rating ${users.specUser.rating}`}
                                </ButtonBase>
                            </Box>
                            <Box style={styles.box}>
                                {decode && decode.id!==users.specUser.id &&
                                <Button style={styles.button} variant='outlined'>
                                    <StarOutline/>
                                </Button>
                                }
                                {decode && decode.id!==users.specUser.id &&
                                <Button style={styles.button} variant='outlined'>
                                    direct
                                </Button>
                                }
                                {
                                    users.user?.role === "admin" ||
                                    users.user?.role === "superAdmin" ||
                                    decode &&
                                    decode.id===users.specUser.id &&
                                    <Button style={styles.button} onClick={handleInfo} variant='outlined'>
                                        <Settings/>
                                    </Button>
                                }
                            </Box>
                        </div>
                    </Box>
                </div>
                <div style={styles.line}> </div>
                <div style={styles.headText}>Posts:</div>
                { posts.posts &&
                <div style={styles.divPosts}>
                    {posts.posts.map( (i) => (
                        <CustomCard
                            key={i.id}
                            cardActions={true}
                            post={i}
                            users={users}
                            decode={decode}
                        />
                    ))}
                </div>
                }
            </div>
            }
        </div>
    )
}

export default account;
