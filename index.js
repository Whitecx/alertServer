import express from 'express';
import * as MailService from 'sendEmail.js';

const app = express();
app.use(express.json());
app.listen(9090);

const RECIPIENT_LIST = process.env.RECIPIENT_LIST;

app.post((req, res)=>{
	console.log("Request received");
	//parse input
	let body = req.body;
	let subject = body.subject ? body.subject : "";
	let text = body.text ? body.text : "";

	//send error if to addresses aren't configured
	if(!RECIPIENT_LIST){ res.status(400).send("Error: Please configure list of recipients in .env file");}

	//parse .env list of recipient addresses
	let recipients = parseRecipients(RECIPIENT_LIST);

	//send email to all recipients
	sendAll(recipients, subject, text);
	//TODO Convert to promiseAll to return success/fail on email sends
	res.status(200).send("ok");
});

const parseRecipients = (list) => {
	//parse into an array;
	return list.split(',');
}

const sendAll = (recipients, subject, text) => {
	recipients.forEach(address => {
		MailService.sendMail(address, subject, text);
	});
}
