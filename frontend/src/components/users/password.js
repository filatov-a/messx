import React from "react";
import {Button} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main";
import {sendUpdate} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function password() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [isPushed, setIsPushed] = r.useState(false);
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            password: true,
        };
        if (users.status === 'idle'){
            dispatch(sendUpdate({user: User, id: decode.id}));
            setIsPushed(true);
        }
    };

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>Change password</h2>
            <form onSubmit={handleSubmit}>
                {isPushed ?
                    <div>
                        <Button onClick={()=>{
                            navigator.clipboard.writeText(users.updateData?.password)}}
                        >
                            Copy password
                        </Button>
                        <Button disabled style={styleAuth.Button} type="submit" variant='contained' color='primary'>Update</Button>
                    </div>
                    :
                    <div>
                        <Button disabled onClick={()=>{
                            navigator.clipboard.writeText(users.updateData?.password)}}
                        >
                            Copy password
                        </Button>
                        <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Update</Button>
                    </div>
                }
            </form>
        </div>
    )
}

export default password;
