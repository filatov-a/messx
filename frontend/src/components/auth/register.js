import React from "react";
import {sendRegister} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {Button, Tabs, Tab} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {useTranslation} from 'react-i18next'
const Tr = useTranslation;

function register() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [full_name, setFullName] = r.useState(null);
    const [isPushed, setIsPushed] = r.useState(false);
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendRegister({ full_name }));
        setIsPushed(true);
    }

    const goToVerify = async () => {
        navigate("/register-verify")
    }

    const onChangeName = (e) => setFullName(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>{t('register')}</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                {!isPushed &&
                    <div>
                        <CustomInput onChange={onChangeName} required placeholder={t('full name')}/>
                        {full_name ?
                            <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("go->")}</Button>
                            :
                            <Button style={styleAuth.Button} disabled type="submit" variant='contained' color='primary'>{t("You have to fill")}</Button>
                        }
                    </div>
                }
                {isPushed &&
                    <div>
                        <div style={{color: "white", width: 300, margin: "auto"}}>
                            <p>
                                <p>ID</p>
                                {/*<p>{users.registerData?.id}</p>*/}
                                <Button onClick={()=>{
                                    navigator.clipboard.writeText(users.updateData?.id)}}
                                >
                                    Copy password
                                </Button>
                            </p>
                            <p>
                                <p>Password</p>
                                {/*<p>{users.registerData?.password}</p>*/}
                                <Button onClick={()=>{
                                    navigator.clipboard.writeText(users.updateData?.password)}}
                                >
                                    Copy password
                                </Button>
                            </p>
                            <p>
                                <p>Token (just to verify)</p>
                                <Button onClick={()=>{
                                    navigator.clipboard.writeText(users.updateData?.token)}}
                                >
                                    Copy token
                                </Button>
                            </p>
                        </div>
                        <Button
                            style={styleAuth.Button}
                            variant='contained'
                            color='primary'
                            onClick={goToVerify}
                        >{t("go->(save all data before)")}</Button>
                    </div>
                }
            </form>
        </div>
    );
}

export default register;
