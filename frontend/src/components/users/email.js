import React from "react";
import {Button, TextField, Alert} from "@mui/material";
import {sendUpdate} from "../../redux/modules/users";
import {styleAuth} from "../../styles/main";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function email() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [email, setEmail] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            email: email,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, navigate: navigate, id: decode.id}));
        }
    };

    const onChangeEmail = (e) => setEmail(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2>Change your email</h2>
            <p>current email: <b>{users.user.email}</b></p>
            <form onSubmit={handleSubmit}>
                <TextField onChange={onChangeEmail} style={styleAuth.TextField} required label='email' type='email' placeholder='my@gmail.com'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default email;
