import React from "react";
import {Box, Button, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles'
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
import config from "../../config/config";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {parseToken} from "../../utils/parseToken";
const Tr = useTranslation;

const UseStyles = makeStyles({
    text: {
        marginTop: 20,
        color: "green"
    }
})

function home() {
    const classes = UseStyles()
    const {t} = Tr();
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();
    const decode = parseToken(users.token);

    return (
        <Box style={{color: "gray"}}>
            <Box display={'flex'} style={{margin:"auto", width: "100%", backgroundRepeat: "repeat-x"}}>
                <div style={{margin:"auto", display:"flex"}}>
                    <img style={{width: 150}} src={`${config.url}/images/Earth.png`} alt={''}/>
                    <div>
                        <p>      # 0 1 0 1      </p>
                        <p># 0 1 0 1 0 0 1 0 1 #</p>
                        <p># 0 1 0 1 0 0 1 0 1 #</p>
                        <p>      # 0 1 0 1      </p>
                    </div>
                </div>
            </Box>
            <Box display={'flex'} style={{width:"100%", marginTop:40}}>
                <Button onClick={()=>{navigate(`/users/${users.user.id}`)}} style={{margin:"auto", color: "gray"}}>
                    <Typography variant="h5" component="h2">
                        {t("My account")}
                    </Typography>
                </Button>
                <Button onClick={()=>{navigate("/create-post")}} style={{margin:"auto", color: "#578aa4"}}>
                    <Typography variant="h5" component="h2">
                        {t("Create post")}
                    </Typography>
                </Button>
                <Button onClick={()=>{navigate("/posts")}} style={{margin:"auto", color: "#bdbbbb"}}>
                    <Typography variant="h5" component="h2">
                        {t("Your line")}
                    </Typography>
                </Button>
            </Box>
            <Box display={'flex'} style={{width:"100%", marginTop:40}}>
                <Button onClick={()=>{navigate("/chats")}} style={{margin:"auto", color: "gray"}}>
                    <Typography variant="h4" component="h2">
                        {t("Send message")}
                    </Typography>
                </Button>
                <Button onClick={()=>{navigate("/posts-top")}} style={{margin:"auto", color: "gray"}}>
                    <Typography variant="h3" component="h2">
                        {t("Top posts")}
                    </Typography>
                </Button>
            </Box>
        </Box>
    );

}

export default home;
