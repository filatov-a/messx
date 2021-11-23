import React from "react";
import {Button, TextField, TextareaAutosize} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Alert} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {sendCreatePost, sendGetPostById} from "../../redux/modules/posts";
import {sendGetAllCategories} from "../../redux/modules/categories";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function createPost() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const categories = rr.useSelector(state => state.categories);
    const decode = parseToken(users.token)

    const [title, setTitle] = r.useState('');
    const [content, setContent] = r.useState('');
    const [Categories, setCategories] = r.useState([]);
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(sendGetAllCategories());
    },[dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const param = {
            title: title,
            content: content,
            categories: Categories,
        };
        if (users.status === 'idle'){
            dispatch(sendCreatePost({user: param, token: users.token, history}));
        }
    };

    const onChangeContent = (e) => setContent(e.target.value);
    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeCategories = (event, newValues) => {setCategories(newValues)};
    return (
        <div className={classes.main} style={{width: '50%'}}>
            <h2>Create post</h2>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <TextField onChange={onChangeTitle} className={classes.input} required label='title'/>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    onChange={onChangeCategories}
                    options={categories.categories}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="filterSelectedOptions"
                            placeholder="category"
                            className={classes.input}
                        />
                    )}
                />
                <TextareaAutosize rowsMax={15} rowsMin={3} onChange={onChangeContent} className={classes.input} required placeholder='some text'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default createPost;