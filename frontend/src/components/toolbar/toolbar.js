import * as React from 'react';
import {Button, Avatar, ButtonBase} from "@mui/material";
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
import {Add, Send, Whatshot, Stars, Search, Notifications} from "@mui/icons-material"
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import config from "../../config/config";
import {parseToken} from '../../utils/parseToken';
import Lg from './lgSelector'
import {useTranslation} from 'react-i18next'
import {AlertMessage} from "../utils/alert";
import PropTypes from 'prop-types';
import {useEffect} from "react";
import {sendGetUser} from "../../redux/modules/users";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import OneSignal from 'react-onesignal';
import Zoom from '@mui/material/Zoom';
const Tr = useTranslation;

export function ScrollTop(props) {
    const { children } = props;
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 100,
        });

    const handleClick = (event) => {
        event.view.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function ToolbarMain(props) {
    const {t} = Tr();
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();
    const decode = parseToken(users.token);

    const register = () => {
        navigate('/register');
    }

    const onAvatar = () => {
        navigate(`/users/${decode.id}`)
        navigate(0)
    }

    useEffect(()=>{
        if (decode?.id) dispatch(sendGetUser({id: decode?.id, token: users.token}))
    }, [])

    return (
        <div>
            <AppBar style={styleToolbar.toolbar}>
                <Toolbar >
                    <div style={{flexGrow: 7, textAlign: 'left'}}>
                        <Box display={'flex'}>
                            <Tooltip title="posts from starts" arrow style={{marginLeft: 10}}>
                                <Link to={'/posts'}>
                                    <Fab color="primary" size="small">
                                        <Stars/>
                                    </Fab>
                                </Link>
                            </Tooltip>
                            <Tooltip title="daily top" arrow style={{marginLeft: 10}}>
                                <Link to={'/posts-top'}>
                                    <Fab color="secondary" size="small">
                                        <Whatshot/>
                                    </Fab>
                                </Link>
                            </Tooltip>
                            <Tooltip title="search" arrow style={{marginLeft: 10}}>
                                <Link to={'/search'}>
                                    <Fab color="primary" size="small">
                                        <Search/>
                                    </Fab>
                                </Link>
                            </Tooltip>
                        </Box>
                    </div>
                    {!users.token && <Lg/>}
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
                                <Link to={'/create-post'}>
                                    <Fab color="primary" size="small">
                                        <Add/>
                                    </Fab>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Notifications" arrow style={{marginLeft: 10}}>
                                <Link to={'/notifications'}>
                                    <Fab color="secondary" size="small">
                                        <Notifications/>
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
                                <ButtonBase onClick={onAvatar} style={{borderRadius:100, marginLeft: 10}}>
                                    <Avatar style={styleToolbar.Avatar} alt="Remy Sharp" src={`${config.url}/images/${users.user.profile_picture}`}/>
                                </ButtonBase>
                            </Tooltip>
                        </Box>
                    }
                    </Toolbar>
                </AppBar>
            <Toolbar />
            <Box display={'block'} style={{width: 250, margin: 15, right: 15, position: "absolute"}}>
                <AlertMessage error={users.error} success={users.success}/>
                <AlertMessage error={posts.error} success={posts.success}/>
            </Box>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </div>
    );
}

