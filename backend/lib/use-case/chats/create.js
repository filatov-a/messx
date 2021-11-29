const Base = require("../base")
const Users = require("../../models/users")
const Chats = require("../../models/chats")
const jwt = require("jsonwebtoken");

module.exports = class register extends Base {
    static async execute(body, token){
        const decode = await jwt.verify(token, this.config.token.accessToken);
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
