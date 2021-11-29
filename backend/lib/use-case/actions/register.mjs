import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class register extends Base {
    static async execute(body){
        await this.joi(this.schemas.user_schema, body);
        body.password = await this.argon2.hash(body.password);
        const usrDb = await Users.createUser({...body});
        const token = await this.jwt.sign({id: usrDb.id}, this.config.token.verifyEmailToken, {expiresIn: "1h"});
        const url = `http://localhost:3000/verify-email/${token}`;

        // await this.mail.sendToVerify(body.email, url, "click to verify account", "");
        return {token}
    };
}
