import React from "react";
import {
    addMessage,
    sendGetChatById, sendMessage
} from '../../redux/modules/chats';

import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

import {parseToken} from '../../utils/parseToken';
import {Avatar, Box, Button, ButtonBase} from "@mui/material";
import {CustomInput, styleToolbar} from "../../styles/main";
import config from "../../config/config";

function specChat(props) {
    const users = rr.useSelector(state => state.users);
    const chats = rr.useSelector(state => state.chats);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const {id} = rd.useParams();
    const {ws} = props;

    const [text, setText] = r.useState('');

    r.useEffect(() => {
        const param = {id: id, token: users.token}
        dispatch(sendGetChatById(param));
    },[]);

    if (ws){
        ws.onmessage = function (event) {
            const dataJson = JSON.parse(event.data);
            dispatch(addMessage(dataJson));
        };
    }

    const onChange = (e) => setText(e.target.value);
    const onSend = () => {
        const param = {userId: users.user.id, chatId: id, descriptions: text}
        dispatch(sendMessage({message: param, ws}));
        setText('');
    }

    return (
        <div>
            <h2 style={{color: "#a2a2a2"}}>{chats.specChat?.name}</h2>
            {/*<CustomInput onChange={onChange} style={{width: 150, margin: "auto", marginBottom: 10, marginTop: 10}} required placeholder={"title"}/>*/}
            <Box display={'flex'} style={{width: 300, margin: "auto", marginBottom: 40, marginTop: 10}}>
                <CustomInput onChange={onChange} required placeholder={"some text"}/>
                <Button onClick={onSend} variant={"outlined"} style={{marginLeft: 10}}>
                    send
                </Button>
            </Box>
            <div style={{width: "90%", margin: "auto"}}>
                { users.user &&
                    chats?.specChat?.Messages.map(i => (
                        <div key={i.id}>
                            <Messages i={i} userId={users.user.id}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function Messages(props) {
    const {i, userId} = props;
    const navigate = rd.useNavigate();

    const styles = {
        main: {
            border: "0.1px solid rgb(51, 153, 255)",
            padding: 10,
            boxShadow: "2px 3px 10px black, 0 0 5px rgb(51, 153, 255) inset",
            maxWidth: "50%",
            minWidth: "30%",
            margin: "auto",
            borderRadius: 10,
        },
        title: {
            color: "#a2a2a2",
            fontSize: 25,
            fontFamily: "blud"
        },
        descriptions: {
            color: "#a2a2a2"
        },

        user: {
            fontFamily: "'Shadows Into Light', cursive",
            color: "rgb(51, 153, 255)",
            lineHeight: "25px",
            outline: 0,
            fontSize: 18,
            // textOverflow: 'ellipsis',
            margin: "auto",
            width: 200
        }
    }

    if (userId === i.userId){
        styles.main.boxShadow = "2px 3px 10px black, 0 0 5px yellow inset"
        styles.main.border = "0.1px solid yellow"
        styles.user.color = "yellow"
    }

    const onAvatar = () => {
        navigate(`/users/${i.userId}`)
        navigate(0)
    }

    return (
        <Box display={"flex"} style={{justifyContent: "space-between", marginBottom: 30}}>
            <Box display={'flex'} style={styles.user}>
                <div style={{marginTop: "auto", marginBottom: "auto"}}>{i.userId}</div>
                <ButtonBase onClick={onAvatar} style={{borderRadius:100, marginLeft: 10}}>
                    <Avatar style={styleToolbar.Avatar} alt="Remy Sharp" src={`${config.url}/images/${i.User.profile_picture}`}/>
                </ButtonBase>
            </Box>
            <Box style={styles.main}>
                {i.title &&
                    <div style={styles.title}>{i.title}</div>
                }
                <div style={styles.descriptions}>
                    {i.descriptions}
                </div>
            </Box>
            <div style={styles.user}>
                {i.createdAt}
            </div>
        </Box>
    )
}

export default specChat;
