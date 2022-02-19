import React from "react";
import {Button} from "@mui/material";
import {styleAuth, CustomTextField} from "../../styles/main"
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
            <h2 style={styleAuth.Title}>{t('sing in')}</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomTextField onChange={onChangeUsername} required placeholder={t('username')}/>
                <CustomTextField onChange={onChangePassword} required placeholder={t('password')} type='password'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("send")}</Button>
            </form>
        </div>
    )
}

export default login;
