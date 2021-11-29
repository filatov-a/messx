export default function(req) {
	if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		return req.headers.authorization.split(" ")[1];
	}

	if (req.query && req.query.token) {
		return req.query.token;
	}

	if (req.params && req.params.token) {
		return req.params.token;
	}

	return null;
};
