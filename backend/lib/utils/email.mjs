import nodemailer from "nodemailer";
import config from "../config/config.cjs";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.app.email,
		pass: config.app.email_password,
	},
});

export default async function sendToVerify(email, url, subject, txt) {
	const mailOptions = {
		from: config.app.email,
		to: email,
		subject,
		text: `${txt}${url}`,
	};

	await transporter.sendMail(mailOptions);
}
