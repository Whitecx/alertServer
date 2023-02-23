//Middleware to restrict IPs

import * as dotenv from 'dotenv';
dotenv.config();

const ALLOW_LIST = process.env.ALLOW_LIST.split(',');

export const restrictIPs = (req, res, next)=> {
	if(ALLOW_LIST.includes(req.hostname)){
		return next();
	}
	console.log("Incoming Request Denied: Not in Allow List");
	return res.status(403).send();
}
