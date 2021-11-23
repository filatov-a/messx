import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {sendLogin, clearError} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function login() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [username, setUsername] = r.useState('');
    const [password, setPassword] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(clearError());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {username, password};
        if (users.status === 'idle'){
            dispatch(sendLogin({user: User, history: history}));
        }
    };

    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    return (
        <div className={classes.main}>
            <h2>Sing in</h2>
            <form onSubmit={handleSubmit}>
                {users.error &&
                    <Alert className={classes.error} severity="error">
                        {/* <AlertTitle>Error</AlertTitle> */}
                        {users.error}
                    </Alert>
                }

                <TextField onChange={onChangeUsername} className={classes.input } required label='username'/>
                <TextField onChange={onChangePassword} className={classes.input} required label='password' type='password'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default login;
