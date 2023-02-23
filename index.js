import express from 'express';
import * as MailService from './util/sendEmail.js';
import * as ipRestrictor from './util/ipRestrictor.js';

const app = express();
app.use(express.json());
app.use(ipRestrictor.restrictIPs);
app.listen(9090);

const RECIPIENT_LIST = process.env.RECIPIENT_LIST;

app.post("/", (req, res)=>{
	console.log("Request received");
	console.log("Recipients: " + RECIPIENT_LIST);
	//parse input
	let body = req.body;
	let subject = body.subject ? body.subject : "";
	let text = body.text ? body.text : "";

	//send error if to addresses aren't configured
	if(!RECIPIENT_LIST){ return res.status(400).send("Error: Please configure list of recipients in .env file");}

	//parse .env list of recipient addresses
	let recipients = parseRecipients(RECIPIENT_LIST);

	//send email to all recipients
	let promises = sendAll(recipients, subject, text);
	//Return ok if all promises resolve
	Promise.all(promises)
	.then(values => {
		return res.status(200).send("ok");
		//Return 500 if one of the promises is rejected
	}).catch((err)=>{ return res.status(500).send("Check text Server logs");});
});

const parseRecipients = (list) => {
	//parse into an array;
	return list.split(',');
}

//Sends an email to each recipient. Returns an array of promises for each email send
const sendAll = (recipients, subject, text) => {
	let promises = [];
	recipients.forEach(address => {
		let promise = MailService.sendMail(address, subject, text);
		promises.push(promise);
	});
	return promises;
}
