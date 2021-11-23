import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {clearError, sendRegister} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function register() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [full_name, setFullName] = r.useState('');
    const [username, setUsername] = r.useState('');
    const [email, setEmail] = r.useState('');
    const [password, setPassword] = r.useState('');
    const [password_confirmation, setPasswordConfirmation] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(clearError());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = { full_name, username, email, password, password_confirmation };
        if (users.status === 'idle'){
            dispatch(sendRegister({user: User, history: history}));
        }
    }

    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangeName = (e) => setFullName(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangePassword2 = (e) => setPasswordConfirmation(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);

    return (
        <div className={classes.main}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {users.error &&
                    <Alert className={classes.error} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {users.error}
                    </Alert>
                }
                <TextField onChange={onChangeUsername} className={classes.input} required label='username'/>
                <TextField onChange={onChangeName} className={classes.input} required label='full name'/>
                <TextField onChange={onChangeEmail} className={classes.input} required label='email' type='email' placeholder='my@gmail.com'/>
                <TextField onChange={onChangePassword} className={classes.input} required label='password' type='password'/>
                <TextField onChange={onChangePassword2} className={classes.input} required label='confirm password' type='password'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    );
}

export default register;
