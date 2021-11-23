import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {clearError} from "../../redux/modules/users";
import {sendUpdate} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function password() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [password, setPassword] = r.useState('');
    const [password2, setPassword2] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(clearError());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            password: password,
            password_confirmation: password2,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, history: history, id: decode.id}));
        }
    };

    const onChangePass = (e) => setPassword(e.target.value);
    const onChangePass2 = (e) => setPassword2(e.target.value);

    return (
        <div className={classes.main}>
            <h2>Change email</h2>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <TextField onChange={onChangePass} className={classes.input} required label='password' type='password'/>
                <TextField onChange={onChangePass2} className={classes.input} required label='confirm password' type='password'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default password;