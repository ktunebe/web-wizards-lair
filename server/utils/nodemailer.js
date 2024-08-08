require('dotenv').config()
const nodemailer = require('nodemailer')
const testDestination = 'jakerasmusson@gmail.com'

const transport = nodemailer.createTransport({
    service: 'Gmail',
    logger: true,
    transactionLog: true,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_EMAIL_ADDRESS,
        pass: process.env.NODEMAILER_APP_PASSWORD
    }
})


const sendMail = async () => {
    try {
        const info = await transport.sendMail({
            from: `"Lair of the Web Wizard" <${process.env.NODEMAILER_EMAIL_ADDRESS}> `,
            to: testDestination,
            subject: 'Testing email',
            text: 'We have been trying to reach you about your cars extended warranty.',
            html: '<b>Hello there</b>'
        })
        console.log('sending mail')
        console.log(info)
        
    } catch (err) {
        console.log(err)
    }

}

sendMail()
process.exit(0)