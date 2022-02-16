import React from "react";
import {Button} from "@mui/material";
import {styleAuth, CustomTextField} from "../../styles/main";
import {sendUpdate} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function name() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [username, setUsername] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            username: username,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, navigate: navigate, id: decode.id}));
        }
    };

    const onChangeLogin = (e) => setUsername(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>Change your username</h2>
            <p style={styleAuth.Title}>current username: <b>{users.user.username}</b></p>
            <form onSubmit={handleSubmit}>
                <CustomTextField onChange={onChangeLogin} required placeholder='login'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default name;
