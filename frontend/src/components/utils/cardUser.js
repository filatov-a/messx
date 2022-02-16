import * as React from "react";
import {
    Card,
    Box,
    Avatar,
    Button,
    ButtonBase,
    CardMedia,
    CardActions,
    CardContent,
} from '@mui/material';
import {
    FavoriteBorder,
    Favorite,
    HeartBrokenOutlined,
    HeartBroken,
    Delete
} from '@mui/icons-material'
import config from "../../config/config";
import * as rd from "react-router-dom";
import {sendDeletePost, sendSetLike} from "../../redux/modules/posts";
import * as rr from "react-redux";

const styles = {
    root: {
        margin: '20px',
        boxShadow: "2px 3px 10px black, 0 0 40px #9f8274 inset",
        background: "#fffef0",
        // borderRadius: 10
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        width: "100%",
        height: "100%",
        textTransform: "none"
    },
    text: {
        // fontFamily: "'Shadows Into Light', cursive",
        textAlign: "justify",
        lineHeight: "25px",
        outline: 0,
        fontSize: 18,
        textOverflow: 'ellipsis',
    },
    cardActions: {
        width: '100%',
        margin: "auto",
        // borderBottom: "1px solid black",
        borderTop: "3px dashed gray",
        boxShadow: "0px 5px 5px gray",
    },
    titleText: {
        fontSize: 25,
        fontFamily: "blud"
    }
};

export const CustomCard = (props) => {
    const navigate = rd.useNavigate();
    const dispatch = rr.useDispatch();

    const onClick = () => {
        navigate(`/users/${props.user.id}`)
    }

    const onDelete = () => {
        dispatch(sendDeletePost(props.post.id));
    }

    return (
        <Card style={styles.root} >
            <Button  style={styles.link} onClick={onClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${config.url}/images/${props.user.profile_picture}`}
                    alt="green iguana"
                />
            </Button>
            <CardContent>
                <div>
                    <div style={styles.text} contentEditable="true">
                        {props.user.full_name}
                    </div>
                </div>
            </CardContent>
            <CardActions style={{display: "block"}}>
                <Box display='flex' style={styles.cardActions}>
                    {props.me &&
                    <Box display={"flex"}>
                        {
                            (props.me.role === "admin" ||
                                props.me.role === "superAdmin" ||
                                props.me.id === props.user.id) &&
                            <Button onClick={onDelete} size="small" color="secondary">
                                <Delete/>
                            </Button>
                        }
                    </Box>
                    }
                </Box>
            </CardActions>
        </Card>
    );
}
