import React from "react";
import {sendDeleteUser, sendGetUserById, sendSetAvatar} from '../../redux/modules/users';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, Button, ButtonBase} from '@mui/material';
import Lg from '../toolbar/lgSelector';
import * as r from "react";
import {logOut} from "../../redux/modules/users";
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import {parseToken} from '../../utils/parseToken';

const styles = {
    personalInformation: {
        width: '50%',
        minWidth: '400px',
        margin: 'auto',
        marginTop: 40,
        // border: '1px solid gray',
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    base: {
        width: '100%',
        textTransform: 'none',
        marginBottom: '10px',
        display: 'flex'
    },
    baseAvatar: {
        // width: '100%',
        borderRadius: '100px',
        marginBottom: '30px',
    },
    type: {
        flex: 1,
        padding: 15,
        textAlign: 'left',
    },
    value: {
        flex: 3,
        textAlign: 'left',
        font: '1.2em "Fira Sans", sans-serif',
    },
    img: {
        width: '200px',
        height: '200px',
        boxShadow: '0 0 0 0px black, 0 0 4px #333',
    }
}

function account() {
    const users = rr.useSelector(state => state.users);
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();
    const id = rd.useParams().id;
    const decode = parseToken(users.token)

    let clientId = '';
    if (decode) clientId = decode.id;

    r.useEffect(() => {
        dispatch(sendGetUserById(id));
    },[]);

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/login');
    }

    const handleDelete = () => {
        dispatch(sendDeleteUser(id));
        if (clientId === id){
            dispatch(logOut());
            navigate('/login');
        } else {
            navigate('/users');
        }
    }

    const handleName = () => {if (clientId === id) navigate('/name')}
    const handleEmail = () => {if (clientId === id) navigate('/email')}
    const handleFullName = () => {if (clientId === id) navigate('/fullname')}
    const handlePassword = () => {if (clientId === id) navigate('/password')}

    return (
        <div>
            {users.specUser &&
            <div style={styles.personalInformation}>
                <h2>Language</h2>
                {(clientId === id) &&
                <div style={{margin: 10}}>
                    <Lg/>
                </div>
                }
                <h2>Personal information</h2>
                <Button style={styles.base} onClick={handleName} variant='outlined'>
                    <div style={styles.type}>Username</div>
                    <div style={styles.value}>{users.specUser.username}</div>
                </Button>
                <Button style={styles.base} onClick={handleFullName} variant='outlined'>
                    <div style={styles.type}>Full name</div>
                    <div style={styles.value}>{users.specUser.full_name}</div>
                </Button>
                {(clientId === id) &&
                <Button style={styles.base} onClick={handleEmail} variant='outlined'>
                    <div style={styles.type}>email</div>
                    <div style={styles.value}>{users.specUser.email}</div>
                </Button>
                }
                {(clientId === id) &&
                <Button style={styles.base} onClick={handlePassword} variant='outlined'>
                    <div style={styles.type}>password</div>
                    <div style={styles.value}>********</div>
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
