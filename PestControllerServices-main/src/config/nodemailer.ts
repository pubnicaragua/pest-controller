import nodemailer from 'nodemailer'

export const prepareNodemailer = async (mailOptions: any) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: process.env.NODEMAILER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  return await transporter.sendMail(mailOptions)
}
