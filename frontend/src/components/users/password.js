import React from "react";
import {Button, TextField} from "@mui/material";
import {styleAuth} from "../../styles/main";
import {sendUpdate} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function password() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [password, setPassword] = r.useState('');
    const [password2, setPassword2] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            password: password,
            password_confirmation: password2,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, navigate: navigate, id: decode.id}));
        }
    };

    const onChangePass = (e) => setPassword(e.target.value);
    const onChangePass2 = (e) => setPassword2(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2>Change password</h2>
            <form onSubmit={handleSubmit}>
                <TextField onChange={onChangePass} style={styleAuth.TextField} required label='password' type='password'/>
                <TextField onChange={onChangePass2} style={styleAuth.TextField} required label='confirm password' type='password'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default password;
