const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendMail = async (req, res) => {
  const { email } = req.body;
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "tixmovieapp@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    let info = await transporter.sendMail({
      from: '"Tix Movie" <tixmovieapp@gmail.com>', // sender address
      to: email.toLowerCase(), // list of receivers
      subject: "Tix Movie ", // Subject line
      attachDataUrls: true, //to accept base64 content in messsage
      html: req.sendMail, // html body
    });
    if (req.userRegister) {
      res.status(201).send({
        notify: "SUCCESS",
        newUser: req.userRegister,
      });
    } else {
      res.status(201).send({
        notify: "SUCCESS",
        // newUser: req.ticketSuccess,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  sendMail,
};
