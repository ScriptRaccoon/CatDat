import { EMAIL_ADDRESS, EMAIL_PASSWORD, ENABLE_EMAILS } from '$env/static/private'
import nodemailer from 'nodemailer'

type Email = {
	to: string
	subject: string
	text: string
}

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: EMAIL_ADDRESS,
		pass: EMAIL_PASSWORD,
	},
})

export async function send_email(email: Email) {
	if (ENABLE_EMAILS === 'true') {
		if (!EMAIL_ADDRESS || !EMAIL_PASSWORD) {
			throw new Error(
				'Email sending is enabled but EMAIL_ADDRESS or EMAIL_PASSWORD is not set',
			)
		}
		await transporter.sendMail({ from: EMAIL_ADDRESS, ...email })
	} else {
		log_email(email)
	}
}

function log_email(email: Email) {
	console.info('--- Email ---')
	console.info('\nRecipient')
	console.info(email.to)
	console.info('\nSubject:')
	console.info(email.subject)
	console.info('\nText:')
	console.info(email.text)
}
