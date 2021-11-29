const Base = require("../base.mjs")
const Users = require("../../models/users.mjs")
const Chats = require("../../models/chats.mjs")

module.exports = class Create extends Base {
    static async execute(body, token){
        const decode = await this.jwt.verify(token, this.config.token.accessToken);
        const usrDb = await Users.findOne({where: {id: decode.id}});
        if (!usrDb) throw new Error("user didn't actions! Incorrect token");
        const schema = {
            name: body.name,
            descriptions: body.descriptions,
            isActive: true,
            userId: usrDb.id,
        };
        const newChats = await Chats.create(schema);

        return {newChats}
    };
}
