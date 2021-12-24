import * as React from 'react';
import {Button, Avatar} from "@mui/material";
import {styleToolbar} from "../../styles/main";
import {Link} from "react-router-dom"
import {
    Box,
    Fab,
    AppBar,
    Tooltip,
    Toolbar,
    useScrollTrigger,
    Slide
} from "@mui/material";
import {Add, Send, Whatshot, Stars, Home} from "@mui/icons-material"
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import config from "../../config/config";
import {parseToken} from '../../utils/parseToken';
import Lg from './lgSelector'
import {useTranslation} from 'react-i18next'
import Alert from "../utils/alert";
import PropTypes from 'prop-types';
import {useEffect} from "react";
import {sendGetUser} from "../../redux/modules/users";
const Tr = useTranslation;

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function HideAppBar(props) {
    const {t} = Tr();
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();
    const decode = parseToken(users.token);

    const register = () => {
        navigate('/register');
    }

    useEffect(()=>{
        dispatch(sendGetUser(decode.id))
    }, [])

    return (
        <div>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar style={styleToolbar.toolbar}>
                        <div style={{flexGrow: 7, textAlign: 'left'}}>
                            <Box display={'flex'}>
                                <Tooltip title="home" arrow style={{marginLeft: 10}}>
                                    <Link to={'/'}>
                                        <Fab color="primary" size="small">
                                            <Home/>
                                        </Fab>
                                    </Link>
                                </Tooltip>
                                <Tooltip title="posts from starts" arrow style={{marginLeft: 10}}>
                                    <Link to={'/chats'}>
                                        <Fab color="primary" size="small">
                                            <Stars/>
                                        </Fab>
                                    </Link>
                                </Tooltip>
                                <Tooltip title="daily top" arrow style={{marginLeft: 10}}>
                                    <Link to={'/posts'}>
                                        <Fab color="secondary" size="small">
                                            <Whatshot/>
                                        </Fab>
                                    </Link>
                                </Tooltip>
                            </Box>
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
            </HideOnScroll>
            <Toolbar />
            <Box style={{width: 250, margin: 15, right: 15, position: "absolute"}}>
                {users.error &&
                    <div>
                        <Alert
                            dispatch={dispatch}
                            text={users.error}
                            severity={"error"}
                        />
                    </div>
                }
                {users.success &&
                    <div>
                        <Alert
                            dispatch={dispatch}
                            text={users.success}
                            severity={"success"}
                        />
                    </div>
                }
                {posts.error &&
                    <div>
                        <Alert
                            dispatch={dispatch}
                            text={posts.error}
                            severity={"error"}
                        />
                    </div>
                }
                {posts.success &&
                    <div>
                        <Alert
                            dispatch={dispatch}
                            text={posts.success}
                            severity={"success"}
                        />
                    </div>
                }
            </Box>
        </div>
    );
}

