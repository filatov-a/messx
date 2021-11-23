import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {Alert} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {sendCreateUser} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function createUser() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [login, setLogin] = r.useState('');
    const [email, setEmail] = r.useState('');
    const [password, setPassword] = r.useState('');
    const [fullName, setFullName] = r.useState('');
    const [role, setRole] = r.useState('');
    const history = rd.useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const param = {
            login: login,
            email: email,
            password: password,
            full_name: fullName,
            role: role,
        };
        if (users.status === 'idle'){
            dispatch(sendCreateUser({user: param, history: history, token: users.token}));
        }
    };

    const onChangeLogin = (e) => setLogin(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeFullName = (e) => setFullName(e.target.value);
    const onChangeRole = (event, newValues) => {setRole(newValues)};

    return (
        <div className={classes.main} style={{width: '50%'}}>
            <h2>Create category</h2>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <TextField onChange={onChangeLogin} className={classes.input} required label='login'/>
                <TextField onChange={onChangePassword} className={classes.input} type={'password'} required label='password'/>
                <TextField onChange={onChangeEmail} className={classes.input} type={'email'} required label='email'/>
                <TextField onChange={onChangeFullName} className={classes.input} required label='full name'/>
                <Autocomplete
                    id="combo-box-demo"
                    options={["user", "admin"]}
                    onChange={onChangeRole}
                    renderInput={(params) => (
                        <TextField {...params} className={classes.input} required label='role'/>
                    )}
                />
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default createUser;