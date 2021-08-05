import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config(  )

const user = process.env.SECRET_USER,
      password = process.env.SECRET_PASSWORD

export const sendMail = async (from, to, subject, text, html) => {
    
    // Creating default SMTP transport method
    let transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
        user: user,
        pass: password
        },
    });

    // sending mail
    let info = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html,
    });
}
