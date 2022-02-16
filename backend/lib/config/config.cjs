// eslint-disable-next-line no-undef
module.exports = {
	projectType: "development", // development production test
	app: {
		port: 5001,
		email: "philatov06@gmail.com",
		email_password: "A3302003a",
	},
	token: {
		verifyEmailToken: "1a2b-3c4d-5e6f-7g8h",
		accessToken: "cjsbrdkjcnrkcbje",
		verifyResetPasswordToken: "ckfjksc23764hdh",
	},
	minio: {
		MINIO_ACCESS_KEY: "minio_access_key",
		MINIO_SECRET_KEY: "minio_secret_key",
		MINIO_HOSTNAME: "s3",
		MINIO_PORT: 9000
	}

};
