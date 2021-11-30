module.exports = {
	development: {
		username: "artem",
		password: "password",
		database: "messx",
		host: "127.0.0.1",
		port: 3306,
		dialect: "mysql",
		logging: false
	},
	test: {
		username: "artem",
		password: "password",
		database: "messx",
		host: "127.0.0.1",
		port: 3306,
		dialect: "mysql"
	},
	production: {
		username: "artem",
		password: "password",
		database: "messx",
		host: "db",
		port: 3306,
		dialect: "mysql",
		logging: false
	}
};
