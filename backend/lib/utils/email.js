const nodemailer = require("nodemailer");
const config = require("../config/project");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.app.email,
		pass: config.app.email_password,
	},
});

async function sendToVerify(email, url, subject, txt) {
	const mailOptions = {
		from: config.app.email,
		to: email,
		subject,
		text: `${txt}${url}`,
	};

	await transporter.sendMail(mailOptions);
}

module.exports.sendToVerify = sendToVerify;
