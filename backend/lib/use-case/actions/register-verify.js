const Base = require("../base")
const Users = require("../../models/users")

module.exports = class registerVerify extends Base {
    static async execute(token){
        const decoded = await this.jwt.verify(token, this.config.token.verifyEmailToken);
        const usrDb = await Users.findOne({where: {id: decoded.id}});
        await usrDb.update({isVerified: true});
    };
}

