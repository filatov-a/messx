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

function email() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [email, setEmail] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(clearError());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            email: email,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, history: history, id: decode.id}));
        }
    };

    const onChangeEmail = (e) => setEmail(e.target.value);

    return (
        <div className={classes.main}>
            <h2>Change your email</h2>
            <p>current email: <b>{users.user.email}</b></p>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <TextField onChange={onChangeEmail} className={classes.input} required label='email' type='email' placeholder='my@gmail.com'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default email;