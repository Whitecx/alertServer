# Alert Server
##### A local webserver for sending text/email based alerts

## DESC
Motivation: Have a local api to send text alerts. If you write a script on the fly and need notification capabilities, leverage this local alert server.


## Install & Run
1. Clone Repo
2. Run npm install
3. Set your .env vars to configure the app (there's a sample called .env.sample)
4. Run npm start

## ENV Vars (don't include curly braces)
RECIPIENT_LIST=emailAddress1,emailAddress2,...emailAddressN

MAIL_USER=smtp-user-name

MAIL_PASS=smtp-password

MAIL_HOST=smtp-host

MAIL_PORT=smtp-host

MAIL_FROM=email-address

You can use [email to send SMS messages](https://en.wikipedia.org/wiki/SMS_gateway) by adding a phone number in the format 5555555@{Your    ProviderSMSGateway}  

If you don't have your own smtp server, you can use a service like [sendgrid](https://sendgrid.com/solutions/email-api/smtp-service/?utm_source=google&utm_medium=cpc&utm_term=sendgrid&utm_campaign=Sitelink_SendGrid_G_S_NAMER_Brand_Tier1&cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&gclid=CjwKCAiAl9efBhAkEiwA4ToriqLLpzC1HsM1jgWBhklkxo8pwRXHXt-i3ars6N2LLhZOPKwvGFSMOxoCphoQAvD_BwE). I use them since they have a free tier


## Usage
Just send a post request to the server (default port 9090) with the json data {"subject": "Some subject", "text": "Some text"}

Ex:

curl -X POST -H "Content-Type: application/json" -d '{"subject": "Test Text", "text": "Hello World!"}' http://localhost:9090
