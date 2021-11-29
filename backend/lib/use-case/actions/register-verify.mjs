import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class registerVerify extends Base {
    static async execute(token){
        const decoded = await this.jwt.verify(token, this.config.token.verifyEmailToken);
        const usrDb = await Users.findOne({where: {id: decoded.id}});
        await usrDb.update({isVerified: true});
    };
}

