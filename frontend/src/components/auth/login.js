import React from "react";
import {Button, TextField} from "@mui/material";
import {styleAuth} from "../../styles/main"
import {sendLogin} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {useTranslation} from 'react-i18next'
const Tr = useTranslation;

function login() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [username, setUsername] = r.useState('');
    const [password, setPassword] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {username, password};
        dispatch(sendLogin({user: User, navigate: navigate}));
    };

    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2>{t('sing in')}</h2>
            <form onSubmit={handleSubmit}>
                <TextField style={styleAuth.TextField} onChange={onChangeUsername} required label={t('username')}/>
                <TextField style={styleAuth.TextField} onChange={onChangePassword} required label={t('password')} type='password'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("send")}</Button>
            </form>
        </div>
    )
}

export default login;
