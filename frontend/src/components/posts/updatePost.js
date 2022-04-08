import React from "react";
import {Button, TextField} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import {styleAuth, CustomInput} from "../../styles/main";
import {sendUpdatePost, sendGetPostById} from "../../redux/modules/posts";
import {sendGetAllCategories} from "../../redux/modules/postsCategories";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function updatePost(props) {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const categories = rr.useSelector(state => state.categories);
    const {id} = rd.useParams();

    const [title, setTitle] = r.useState('');
    const [content, setContent] = r.useState(posts.specPost?.content);
    const [Categories, setCategories] = r.useState(posts.specPost?.PostsCategories);
    const navigate = rd.useNavigate();

    r.useEffect(() => {
        dispatch(sendGetAllCategories());
        const param = {id: id, token: users.token}
        dispatch(sendGetPostById(param));
    },[dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const param = {
            title: title,
            content: content,
            categories: Categories,
            postId: props.postId,
        };
        dispatch(sendUpdatePost({
            post: param,
            id: id,
            navigate
        }));
    };


    const onChangeContent = (e) => setContent(e.target.value);
    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeCategories = (event, newValues) => {
        let arr = []
        if (!newValues.length) arr.push(newValues)
        for (const i in newValues) arr.push(newValues[i].id)
        setCategories(arr)
    };

    return (
        <div style={styleAuth.Div}>
            {!props.withoutTitle && <h2 style={styleAuth.Title}>Update post</h2>}
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput
                    onChange={onChangeTitle}
                    required
                    variant="outlined"
                    label="title"
                    placeholder="title"
                    autoFocus
                    value={posts.specPost?.title}
                />
                <CustomInput
                    multiline
                    maxRows={5}
                    onChange={onChangeContent}
                    required placeholder='some text'
                    value={posts.specPost?.content}
                />
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
                        />
                    )}
                />
                <Button style={styleAuth.Button} type="submit" variant='outlined' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default updatePost;
