import React from "react";
import {sendGetUserById} from '../../redux/modules/users';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, Button, ButtonBase, Box} from '@mui/material';
import * as r from "react";
import {parseToken} from '../../utils/parseToken';
import config from "../../config/config";
import {StarOutline, Start, Settings} from '@mui/icons-material';

const styles = {
    personalInformation: {
        width: '90%',
        minWidth: '400px',
        margin: 'auto',
        // border: "1px solid black",
        marginTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
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
    avatar: {
        width: '300px',
        height: '300px',
        marginRight: 5,
        marginBottom: 3,
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
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const id = rd.useParams().id;
    const decode = parseToken(users.token)

    let clientId = '';
    if (decode) clientId = decode.id;

    r.useEffect(() => {
        dispatch(sendGetUserById(id));
    },[]);

    const handleInfo = () => {
        if (clientId === id) {
            navigate(`/users/${users.specUser.id}/info`)
        }
    }

    return (
        <div>
            {users.specUser &&
            <div>
                <div style={styles.personalInformation}>
                    <Box style={styles.box}>
                        <Avatar
                            src={`${config.url}/images/${users.specUser.profile_picture}`}
                            sx={styles.avatar}
                        />
                        <div>
                            <div style={styles.headText}>{users.specUser.full_name}</div>
                            <div style={styles.grayText}>{users.specUser.username}</div>
                        </div>
                        <div>
                            <Box style={styles.box}>
                                <ButtonBase style={styles.handleText}>
                                    {`stars ${users.specUser.followers.length}`}
                                </ButtonBase>
                                <ButtonBase style={styles.handleText}>
                                    {`stared ${users.specUser.users.length}`}
                                </ButtonBase>
                                <ButtonBase style={styles.handleText}>
                                    {`rating ${users.specUser.rating}`}
                                </ButtonBase>
                            </Box>
                            <Box style={styles.box}>
                                {clientId!==id &&
                                <Button style={styles.button} variant='outlined'>
                                    <StarOutline/>
                                </Button>
                                }
                                {clientId!==id &&
                                <Button style={styles.button} variant='outlined'>
                                    direct
                                </Button>
                                }
                                {clientId===id &&
                                <Button style={styles.button} onClick={handleInfo} variant='outlined'>
                                    <Settings/>
                                </Button>
                                }
                            </Box>
                        </div>
                    </Box>
                </div>
                <div style={styles.line}> </div>
            </div>
            }
        </div>
    )
}

export default account;
