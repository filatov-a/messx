const Base = require("../base")

module.exports = class login extends Base {
    static async execute(body){
        const users = this.db.Users;
        const user = await users.findOne({where: {username: body.username}});

        if (user === null) {
            throw new Error("wrong account login");
        }

        const ok = await this.argon2.verify(user.password, body.password);

        if (!ok) {
            throw new Error("wrong account password");
        }

        if (!user.isVerified) {
            throw new Error("u must to verify account");
        }

        return this.jwt.sign({id: user.id},
            this.config.token.accessToken, {expiresIn: "7d"});
    };
}
