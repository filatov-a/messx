import React from "react";
import {sendVerifyEmail} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Redirect} from "react-router-dom";
import * as r from "react";

function verify() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const { token } = rd.useParams();

    r.useEffect(() => {
        if (users.status === 'idle'){
            dispatch(sendVerifyEmail(token))
        }
    },[dispatch])

    const ok = (
        <div>
            <h2>Verify account</h2>
        </div>
    );

    return (
        <div>
            {users.error && <Redirect to="/404" />}
            {!users.error && ok}
        </div>
    )
}

export default verify;
