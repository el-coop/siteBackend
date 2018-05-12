var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

router.post('/api/contact', function (req, res, next) {
	var transporter = nodeMailer.createTransport({
		host: process.env.MAIL_HOST,
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD
		}
	});
	var mailOptions = {
		from: '"Contact Form" <contact.@elcoop.io>', // sender address
		to: 'contact.@elcoop.io', // list of receivers
		subject: 'Message from ' + req.body.name, // Subject line
		text: req.body.name + '\n' + req.body.email + '\n' + req.body.message, // plain text body
		html: '<b>Message from: </b>' + req.body.name + '<br>Email: ' + req.body.email + '<br><br>' + req.body.message, // html body,
		replyTo: req.body.email
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.status(500).send({success: false})
		}

		res.send({
			success: true
		});
	});
});

module.exports = router;