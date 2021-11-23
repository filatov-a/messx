import React from "react";
import {Button, TextField, TextareaAutosize} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {sendCreateCategory} from "../../redux/modules/categories";
import {sendGetAllCategories} from "../../redux/modules/categories";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function createCategory() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const categories = rr.useSelector(state => state.categories);

    const [title, setTitle] = r.useState('');
    const [description, setDescription] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(sendGetAllCategories());
    },[dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const param = {
            title: title,
            description: description,
        };
        if (users.status === 'idle'){
            dispatch(sendCreateCategory({user: param, history: history}));
        }
    };

    const onChangeContent = (e) => setDescription(e.target.value);
    const onChangeTitle = (e) => setTitle(e.target.value);
    return (
        <div className={classes.main} style={{width: '50%'}}>
            <h2>Create category</h2>
            <form onSubmit={handleSubmit}>
                {categories.error &&
                <Alert className={classes.error} severity="error">
                    {categories.error}
                </Alert>
                }
                <TextField onChange={onChangeTitle} className={classes.input} required label='title'/>
                <TextareaAutosize rowsMax={15} rowsMin={3} onChange={onChangeContent} className={classes.input} required placeholder='some text'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default createCategory;