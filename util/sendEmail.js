import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();


const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const from = process.env.MAIL_FROM;

export const sendMail = (to, subject="", text="") => {
	console.log("Preparing to send mail to " + to);
	let transporter = nodemailer.createTransport({
		host: host,
		port: port,
		secure: true,
		auth:{
			user: user,
			pass: pass,
		}
	});

	return transporter.sendMail({
		from: from,
		to: to,
		subject: subject,
		text: text
	});
	//TODO add filesystem logging module for sucessful and failed messages
}
	

