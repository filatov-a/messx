import React from "react";
import {sendRegister} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {Button, Tabs, Tab} from "@mui/material";
import {styleAuth, CustomTextField} from "../../styles/main"
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
    const onChangeGender = (event, newValue) => setGender(newValue);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>{t('register')}</h2>
            <form onSubmit={handleSubmit}>
                <CustomTextField onChange={onChangeUsername} required placeholder={t('username')}/>
                <CustomTextField onChange={onChangeName} required placeholder={t('full name')}/>
                <CustomTextField onChange={onChangeEmail} required placeholder={t('email')} type='email'/>
                <CustomTextField onChange={onChangePassword} required placeholder={t('password')} type='password'/>
                <Tabs
                    value={gender}
                    onChange={onChangeGender}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab style={styleAuth.Title} value="male" label={t("male")} />
                    <Tab style={styleAuth.Title} value="female" label={t("female")} />
                </Tabs>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("send")}</Button>
            </form>
        </div>
    );
}

export default register;
