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

function card() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [cvc, setCvc] = r.useState('');
    const [expiry, setExpiry] = r.useState('');
    const [focused, setFocused] = r.useState('');
    const [number, setNumber] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(clearError());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            card: card,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, history: history, id: decode.id}));
        }
    };

    const onChangeNumber = (e) => setNumber(e.target.value);

    return (
        <div className={classes.main}>
            <h2>Change card</h2>
            <p>current card: <b>{users.user.card}</b></p>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <TextField onChange={onChangeNumber} className={classes.input} required label='card number'/>
                <TextField onChange={onChangeNumber} className={classes.input} required label='card number'/>
                <TextField onChange={onChangeNumber} className={classes.input} required label='card number'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default card;
