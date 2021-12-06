import React from "react";
import {MenuItem} from "@mui/material";
import {clearError, sendRegister} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {Button, Avatar, Toolbar, TextField, Select} from "@mui/material";
import {styleAuth} from "../../styles/main"
import {useTranslation} from 'react-i18next'
const Tr = useTranslation;

function register() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [full_name, setFullName] = r.useState('');
    const [username, setUsername] = r.useState('');
    const [email, setEmail] = r.useState('');
    const [password, setPassword] = r.useState('');
    const [gender, setGender] = r.useState('male');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = { full_name, username, email, password, gender };
        if (users.status === 'idle'){
            dispatch(sendRegister({user: User, navigate: navigate}));
        }
    }

    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangeName = (e) => setFullName(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangeGender = (e) => setGender(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2>{t('register')}</h2>
            <form onSubmit={handleSubmit}>
                <TextField style={styleAuth.TextField} onChange={onChangeUsername} required label={t('username')}/>
                <TextField style={styleAuth.TextField} onChange={onChangeName} required label={t('full name')}/>
                <TextField style={styleAuth.TextField} onChange={onChangeEmail} required label={t('email')} type='email' placeholder='my@gmail.com'/>
                <TextField style={styleAuth.TextField} onChange={onChangePassword} required label={t('password')} type='password'/>
                <Select
                    style={styleAuth.TextField}
                    value={gender}
                    onChange={onChangeGender}
                >
                    <MenuItem value={"male"}>{t("male")}</MenuItem>
                    <MenuItem value={"female"}>{t("female")}</MenuItem>
                </Select>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("send")}</Button>
            </form>
        </div>
    );
}

export default register;
