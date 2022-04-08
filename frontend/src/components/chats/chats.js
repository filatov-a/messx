import React from "react";
import {Box, Button} from '@mui/material';
import {sendGetAllChats} from '../../redux/modules/chats'
import * as rr from "react-redux";
import * as r from "react";
import {CustomCard} from '../utils/card'
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {parseToken} from "../../utils/parseToken";
import InfiniteScroll from "react-infinite-scroll-component";
import * as rd from "react-router-dom";

const styles = {
    divPosts: {
        width: '90%',
        minWidth: '400px',
        margin: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
}

function posts() {
    const chats = rr.useSelector(state => state.chats);
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    const [page, setPage] = r.useState(0);

    r.useEffect(() => {
        if (chats.status === 'idle'){
            dispatch(sendGetAllChats({token: users?.token, page}));
            setPage((prevPageNumber) => prevPageNumber + 1);
        }
    }, [dispatch])

    const trigger = () => {
        // dispatch(sendGetAllPosts({token: users?.token, page}));
        // setPage((prevPageNumber) => prevPageNumber + 1);
    }

    return (
        <Box>
            <h1 style={{color: "#a2a2a2"}}>Chats</h1>
            {users.user &&
            <Tooltip title="create chat" arrow aria-label="add">
                <Link to={'/create-chat'}>
                    <Fab color="primary" size="small">
                        <AddIcon />
                    </Fab>
                </Link>
            </Tooltip>
            }
            <div style={{width: "90%", margin: "auto", marginTop: 40}}>
                    { chats.chats.length !== 0 &&
                        <Box style={styles.divPosts}>
                            { chats.chats.map( (i) => (
                                <Chat i={i}/>
                            ))}
                        </Box>
                    }
            </div>
        </Box>
    );
}

function Chat(props) {
    const {i} = props;
    const navigate = rd.useNavigate();

    const onClick = () => {
        navigate(`/chats/${i.id}`)
    }

    return (
        <Button
            color="primary"
            variant={'outlined'}
            fullWidth id={i.id}
            style={{marginTop: 10, padding: 10}}
            onClick={onClick}
        >
            {i.name}
        </Button>
    )
}

export default posts;
