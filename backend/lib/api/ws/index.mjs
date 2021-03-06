import {WebSocketServer} from "ws";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";
import url from "url";
import jwt from "jsonwebtoken";
import config from "#messx-global-config";

export default async (server) => {
	const wss = new WebSocketServer({ noServer: true });
	let list = [];

	wss.on("connection", async function connection(ws, req) {
		const token = url.parse(req.url, true).query.token;
		const userData = await jwt.verify(token, config.token.accessToken);

		ws.userId = userData.id;
		list.push({ws, id: userData.id});
		// await setStatus(userData.id);

		ws.on("message", async function message(data) {
			const dataJson = JSON.parse(data);
			const chat = await Chats.findOne({
				where: {id: dataJson.chatId},
				include: Users
			});
			for (let i in chat.Users){
				for (let j in list){
					if (list[j].id === chat.Users[i].id){
						list[j].ws.send(JSON.stringify(dataJson));
						console.log(`${list[j].id} sent message to chat ${chat.name}`);
					}
				}
			}
		});

		ws.on("close", async function close() {
			// await setStatusOffline(ws.userId);
			list = list.map(i => {
				if (i.userId !== userData) return i;
			});
		});
	});


	server.on("upgrade", function upgrade(request, socket, head) {
		authenticate(request, function next(err) {
			if (err) {
				console.log("error: ws/index");
				socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
				socket.destroy();
				return;
			}

			wss.handleUpgrade(request, socket, head, function done(ws) {
				wss.emit("connection", ws, request);
			});
		});
	});
};

function authenticate(request, next){
	let err = null;
	next(err);
}

async function setStatus(userId){
	if (!userId) return;
	console.log(`online ${userId}`);

	const user = await Users.findByPk(userId);
	if (user.status === "verified" || user.status === "offline"){
		await user.update({status: "online"});
	}
}

async function setStatusOffline(userId){
	if (!userId) return;
	console.log(`offline ${userId}`);

	const user = await Users.findByPk(userId);
	if (user.status === "online"){
		await user.update({status: "offline"});
	}
}