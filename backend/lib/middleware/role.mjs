import jwt from "jsonwebtoken";
import config from "../config/configSeq.cjs";

function getToken(ctx){
	const authHeader = ctx.get("authorization");
	return authHeader && authHeader.split(" ")[1];
}

export const isUser = async (ctx, next) => {
	const token = getToken(ctx);
	if (token == null) return (ctx.status = 401);
	const users = ctx.db.Users;

	try {
		const decode = await jwt.verify(token, config.token.accessToken);
		const user = await users.findOne({where : {id: decode.id}});
		if (user.isVerified === true) {
			ctx.authToken = user.id;
			await next();
		} else {
			ctx.body = "You should verify your email firstly";
			ctx.status = 401;
		}
	} catch (e) {
		ctx.throw(400, e);
	}
};

export const isAdmin = async (ctx, next) => {
	const token = getToken(ctx);
	if (token == null) return (ctx.status = 401);
	const users = ctx.db.Users;

	try {
		const decode = await jwt.verify(token, config.token.accessToken);
		console.log(111);
		const user = await users.findOne({where : {id: decode.id}});
		if (user.role === "admin") {
			ctx.authToken = user.id;
			await next();
		} else {
			ctx.body = "You are not admin";
			ctx.status = 401;
		}
	} catch (e) {
		ctx.throw(400, e);
	}
};
