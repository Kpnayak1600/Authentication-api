import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

export const registerMail = (req, res) => {

    const { userEmail, OTP } = req.body;

    let config = {
        service: 'gmail',
        auth: {
            user: ENV.EMAIL,
            pass: ENV.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: "Dear user",
            intro: "We are sending you this one-time code to verify your identity and reset the passward . ",
            table: {
                data: [
                    {
                        item: `code : <h1>${OTP}<h1>`
                    }
                ]
            },
            outro: ""
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: "Your Verification Code for Reset Password",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}