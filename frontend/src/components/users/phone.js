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
import MuiPhoneNumber from 'material-ui-phone-number';

function phone() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [phone, setPhone] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(clearError());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            phone: phone,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, history: history, id: decode.id}));
        }
    };

    const onChangePhone = (value) => setPhone(value);

    console.log(phone)

    return (
        <div className={classes.main}>
            <h2>Change phone</h2>
            <p>current phone: <b>{users.user.phone}</b></p>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <MuiPhoneNumber className={classes.input} defaultCountry={'ua'} onChange={onChangePhone}/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default phone;
