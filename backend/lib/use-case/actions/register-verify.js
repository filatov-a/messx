const Base = require("../base")

module.exports = class registerVerify extends Base {
    static async execute(token){
        const decoded = await this.jwt.verify(token, this.config.token.verifyEmailToken);
        const usrDb = await this.db.Users.findOne({where: {id: decoded.id}});
        await usrDb.update({isVerified: true});
    };
}

