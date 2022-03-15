import {parseToken} from "../utils/parseToken";
import config from "../config/config";

export function ws(param){
    const {users} = param;
    const decode = parseToken(users.token);

    const ws = new WebSocket(`${config.urlWs}/?token=${users.token}`);

    ws.onopen = (event) => {
        ws.send(JSON.stringify({userId: decode.id}));
    };

    ws.onclose = (event) => {
        ws.send(JSON.stringify({userId: decode.id}));
    }

    ws.onmessage = function (event) {

    };
}