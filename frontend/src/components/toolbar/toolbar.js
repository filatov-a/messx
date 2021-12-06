import React from "react";
import {Button, Avatar} from "@mui/material";
import {styleToolbar} from "../../styles/main";
import {Link} from "react-router-dom"
import {Box, Fab, AppBar, Tooltip, Toolbar} from "@mui/material";
import {Add, Send} from "@mui/icons-material"
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import config from "../../config/config";
import {parseToken} from '../../utils/parseToken';
import Lg from './lgSelector'
import {useTranslation} from 'react-i18next'
import Alert from "../utils/alert";
const Tr = useTranslation;

function toolbar() {
    const {t} = Tr();
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();
    let decode = parseToken(users.token);

    const register = () => {
        navigate('/register');
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={styleToolbar.toolbar}>
                    <div style={{flexGrow: 7, textAlign: 'left'}}>
                        <Link style={styleToolbar.Link} to="/">{t("home")}</Link>
                    </div>
                    {!users.token &&
                    <Lg/>
                    }
                    {!users.token &&
                    <div>
                        <Link style={styleToolbar.Link} to="/login">{t("sing in")}</Link>
                        <Button
                            style={styleToolbar.button}
                                onClick={register}
                                variant='contained' color='primary'
                        >
                            {t("register")}
                        </Button>
                    </div>
                    }
                    {users.token && decode && users.user &&
                    <Box display='flex'>
                        <Tooltip title="Add post" arrow style={{marginLeft: 10}}>
                            <Link to={'/createpost'}>
                                <Fab color="primary" size="small">
                                    <Add/>
                                </Fab>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Send message" arrow style={{marginLeft: 10}}>
                            <Link to={'/chats'}>
                                <Fab color="primary" size="small">
                                    <Send/>
                                </Fab>
                            </Link>
                        </Tooltip>
                        <Tooltip title="account" placement="bottom-start" arrow style={{marginLeft: 10}}>
                            <Link to={`/users/${decode.id}`}>
                                <Avatar style={styleToolbar.Avatar} alt="Remy Sharp" src={`${config.url}/images/${users.user.profile_picture}`}/>
                            </Link>
                        </Tooltip>
                    </Box>
                    }
                </Toolbar>
            </AppBar>
            {users.error &&
                <div style={{width: 250, margin: 15, right: 15, position: "absolute"}}>
                    <Alert
                        dispatch={dispatch}
                        text={users.error}
                        severity={"error"}
                    />
                </div>
            }
            {users.success &&
            <div style={{width: 250, margin: 15, right: 15, position: "absolute"}}>
                <Alert
                    dispatch={dispatch}
                    text={users.success}
                    severity={"success"}
                />
            </div>
            }
        </div>
    )
}

export default toolbar;
