import React from "react";
import {Button, TextField, TextareaAutosize} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {sendCreateComment, sendCreatePost, sendGetPostById} from "../../redux/modules/posts";
import {sendGetAllCategories} from "../../redux/modules/categories";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function createPost() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const id = parseInt(rd.useParams().id);

    const [content, setContent] = r.useState('');

    r.useEffect(() => {
        dispatch(sendGetAllCategories());
    },[dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const param = {
            content: content,
        };
        if (users.status === 'idle'){
            dispatch(sendCreateComment({user: param, token: users.token, id: id}));
        }
    };

    const onChangeContent = (e) => setContent(e.target.value);

    return (
        <div className={classes.main} style={{width: '50%'}}>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <TextareaAutosize rowsMax={15} rowsMin={3} onChange={onChangeContent} className={classes.input} required placeholder='some text'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default createPost;