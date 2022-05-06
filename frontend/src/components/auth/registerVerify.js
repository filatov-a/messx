import React from "react";
import {sendRegisterVerify, sendVerifyEmail} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Navigate} from "react-router-dom";
import * as r from "react";
import {CustomInput, styleAuth} from "../../styles/main";
import {useTranslation} from 'react-i18next'
import {Button} from "@mui/material";
const Tr = useTranslation;

function verify() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [token, setToken] = r.useState(null);
    const [isPushed, setIsPushed] = r.useState(false);
    const navigate = rd.useNavigate();

    const click = () => {
        if (users.status === 'idle'){
            dispatch(sendRegisterVerify({token, navigate}))
            setIsPushed(true);
        }
    }

    const onChangeToken = (e) => setToken(e.target.value);


    return (
        <div style={styleAuth.Div}>
            <h3 style={styleAuth.Title}>Put verify token</h3>
            {!isPushed &&
                <form style={styleAuth.Form}>
                    <CustomInput onChange={onChangeToken} required placeholder={t('token')}/>
                    {token ?
                        <Button style={styleAuth.Button} onClick={click} variant='contained' color='primary'>{t("go->")}</Button>
                        :
                        <Button style={styleAuth.Button} disabled onClick={click} variant='contained' color='primary'>{t("You have to fill")}</Button>
                    }
                </form>
            }
        </div>
    )
}

export default verify;
