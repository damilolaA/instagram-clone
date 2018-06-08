const nodemailer = require('nodemailer'),
			sgTransport = require('nodemailer-sendgrid-transport'),
			{
				SENDGRID_USERNAME,
				SENDGRID_PASSWORD
			} = require('../../../config/config.js');

let options = {
	auth: {
		api_user: SENDGRID_USERNAME,
		api_key: SENDGRID_PASSWORD
	}
}

let mailer = nodemailer.createTransport(sgTransport(options));

const sendMail = (email) => {

	let payload = {
    from: 'adiodamilola@yahoo.com',
    to: email,
    subject: 'Successful Instagram-Clone Registration',
    html: '<p>Welcome to Instagram-Clone. Enjoy</p>';
	};

	return new Promise((resolve, reject) => {
		mailer.sendMail(payload, (err, info) => {
			if(err) {
				reject(err);
			}
			resolve(info);
		});
	});
}

module.exports = sendMail;
