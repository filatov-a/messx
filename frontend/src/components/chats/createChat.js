import React from "react";
import {Button, TextField} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import {styleAuth, CustomInput} from "../../styles/main";
import {sendCreateChat} from "../../redux/modules/chats";
import {sendGetAllCategories} from "../../redux/modules/chatsCategories";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function createChat(props) {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const chatsCategories = rr.useSelector(state => state.chatsCategories);

    const [name, setName] = r.useState('');
    const [isNameDefault, setIsNameDefault] = r.useState(true);
    const [priority, setPriority] = r.useState(-1);
    const [Categories, setCategories] = r.useState([]);
    const [Users, setUsers] = r.useState([]);
    const navigate = rd.useNavigate();

    r.useEffect(() => {
        dispatch(sendGetAllCategories());
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const param = {
            name,
            priority,
            categories: Categories,
            users: Users
        };
        dispatch(sendCreateChat({
            chat: param,
            token: users.token,
            navigate
        }));
    };

    const onChangePriority = (e) => setPriority(e.target.value);
    const onChangeName = (e) => {setName(e.target.value); setIsNameDefault(false)};
    const onChangeCategories = (event, newValues) => {
        let arr = []
        if (!newValues.length) arr.push(newValues)
        for (const i in newValues) arr.push(newValues[i].id)
        setCategories(arr)
    };
    const onChangeUsers = (event, newValues) => {
        let arr = []
        if (!newValues.length) arr.push(newValues)
        for (const i in newValues) arr.push(newValues[i].id)
        setUsers(arr)
        if (isNameDefault) setName(arr.join(', '));
    };

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>Create chat</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                {users.user?.following &&
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        onChange={onChangeUsers}
                        options={users.user.following}
                        getOptionLabel={(option) => option.id}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="users"
                                placeholder="following"
                            />
                        )}
                    />
                }
                {chatsCategories.categories?.length !== 0 &&
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        onChange={onChangeCategories}
                        options={chatsCategories.categories}
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
                }
                <CustomInput type="number" value={priority} onChange={onChangePriority} required placeholder='priority'/>
                <CustomInput
                    onChange={onChangeName}
                    required
                    value={name}
                    variant="outlined"
                    label="title"
                    placeholder="Name of chat"
                />
                <Button style={styleAuth.Button} type="submit" variant='outlined' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default createChat;
