const nodemailer = require('nodemailer')

const Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendVerificationMail = async (user, host) => {
  try {
    const mailOptions = ({
      from: process.env.EMAIL_ACCOUNT,
      to: user.email,
      subject: 'Account Verification Link',
      html: `<h3>Hello, ${user.username} Please, verify your email by clicking  <a href="http://${host}/api/v1/users/verify/${user.security?.cryptoToken}">here</a></h3> `
    })

    return await Transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
}

const sendForgotPasswordMail = async (user) => {
  try {
    const mailOptions = ({
      from: process.env.EMAIL_ACCOUNT,
      to: user.email,
      subject: 'Reset Password Warning',
      text: `Hello, ${user.username}. This is an information message because you have requested a password change.
      Until you change it, your account will be locked`
    })

    return await Transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
}

const sendChangedPasswordMail = async (user) => {
  try {
    const mailOptions = ({
      from: process.env.EMAIL_ACCOUNT,
      to: user.email,
      subject: 'Reset Password Info',
      text: `Hello, ${user.username}. This is a password change confirmation message`
    })

    return await Transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
}

module.exports = { sendVerificationMail, sendForgotPasswordMail, sendChangedPasswordMail }