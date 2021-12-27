import React from "react";
import {Button, TextField, TextareaAutosize} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import {Alert} from "@mui/material";
import {styleAuth} from "../../styles/main";
import {sendCreatePost, sendGetPostById} from "../../redux/modules/posts";
import {sendGetAllCategories} from "../../redux/modules/categories";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function createPost() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const categories = rr.useSelector(state => state.categories);
    const decode = parseToken(users.token)

    const [title, setTitle] = r.useState('');
    const [content, setContent] = r.useState('');
    const [Categories, setCategories] = r.useState([]);
    const navigate = rd.useNavigate();

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
            dispatch(sendCreatePost({user: param, token: users.token, navigate}));
        }
    };

    const onChangeContent = (e) => setContent(e.target.value);
    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeCategories = (event, newValues) => {setCategories(newValues)};
    return (
        <div style={styleAuth.Div}>
            <h2>Create post</h2>
            <form onSubmit={handleSubmit}>
                <TextField onChange={onChangeTitle} style={styleAuth.TextField} required label='title'/>
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
                            label="categories"
                            placeholder="category"
                            style={styleAuth.TextField}
                        />
                    )}
                />
                <TextareaAutosize rowsMax={15} rowsMin={3} onChange={onChangeContent} style={styleAuth.TextareaAutosize} required placeholder='some text'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default createPost;
