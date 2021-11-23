import React from "react";
import {sendDeleteUser, sendGetUserById, sendSetAvatar} from '../../redux/modules/users';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, Button, ButtonBase} from '@material-ui/core';
import * as r from "react";
import {logOut} from "../../redux/modules/users";
import DeleteIcon from '@material-ui/icons/Delete';
import {UseStyles} from '../../styles/acc';
import {parseToken} from '../../utils/parseToken';

function account() {
    const users = rr.useSelector(state => state.users);
    const history = rd.useHistory();
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);
    const decode = parseToken(users.token)

    let clientId = '';
    if (decode) clientId = decode.id;

    r.useEffect(() => {
        dispatch(sendGetUserById(id));
    },[dispatch]);

    const handleLogOut = () => {
        dispatch(logOut());
        history.push('/login');
    }

    const handleDelete = () => {
        dispatch(sendDeleteUser(id));
        if (clientId === id){
            dispatch(logOut());
            history.push('/login');
        } else {
            history.push('/users');
        }
    }

    const handleName = () => {if (clientId === id) history.push('/name')}
    const handleEmail = () => {if (clientId === id) history.push('/email')}
    const handleFullName = () => {if (clientId === id) history.push('/fullname')}
    const handlePassword = () => {if (clientId === id) history.push('/password')}
    const handlePhone = () => {if (clientId === id) history.push('/phone')}
    const handleCard = () => {if (clientId === id) history.push('/card')}

    if (!(clientId === id || users.user === "admin")) history.push("/404")

    return (
        <div>
            {users.specUser &&
            <div className={classes.personalInformation}>
                <h2>Personal information</h2>
                <Button className={classes.base} onClick={handleName} variant='outlined'>
                    <div className={classes.type}>Username</div>
                    <div className={classes.value}>{users.specUser.username}</div>
                </Button>
                <Button className={classes.base} onClick={handleFullName} variant='outlined'>
                    <div className={classes.type}>Full name</div>
                    <div className={classes.value}>{users.specUser.full_name}</div>
                </Button>
                <Button className={classes.base} onClick={handleEmail} variant='outlined'>
                    <div className={classes.type}>email</div>
                    <div className={classes.value}>{users.specUser.email}</div>
                </Button>
                <Button className={classes.base} onClick={handlePhone} variant='outlined'>
                    <div className={classes.type}>phone</div>
                    <div className={classes.value}>{users.specUser.phone}</div>
                </Button>
                {(clientId === id) &&
                <Button className={classes.base} onClick={handlePassword} variant='outlined'>
                    <div className={classes.type}>password</div>
                    <div className={classes.value}>********</div>
                </Button>
                }
                {(clientId === id) &&
                <Button style={{marginRight:20, marginBottom:10}} onClick={handleLogOut} variant='outlined' color='secondary'>
                    LOG OUT
                </Button>
                }
                {users.user && (users.user.role === 'admin' || clientId === id) &&
                    <Button onClick={handleDelete} style={{marginBottom:10}} variant='contained' color='secondary'>
                        <DeleteIcon fontSize='small'/>
                        delete
                    </Button>
                }
            </div>
            }
        </div>
    )
}

export default account;
