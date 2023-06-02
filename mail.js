const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
var QRCode = require("qrcode");

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
const sendMail = async () => {
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
    let img = await QRCode.toDataURL(
      "data invoice untuk di kirim melalui email"
    );
    var content = "";
    content += `
    <div style="text-align: center; text-transform: uppercase; color: red; text-shadow: transparent;">Tix Movie xin gửi bạn thông tin vé</div>
    <div style="display: flex; gap: 50px;height: 200px;">
        <img  src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/r/s/rsz_spiderverse2_poster_4.jpg" />
        <div>
            <p>Tên phim Nobita and Doreamon</p>
            <p>Cụm rạp : BHD</p>
            <p>Rạp chiếu : BHD Phạm Hùng</p>
            <p>Thời gian : 02/06/2023 20:00 PM</p>
        </div>
    </div>
    <div style="display: flex; justify-content: center; align-items: center;">
      <img src="${img}">'
    </div>
      `;
    let info = await transporter.sendMail({
      from: '"Tix Movie" <tixmovieapp@gmail.com>', // sender address
      to: "cuongng1912@gmail.com", // list of receivers
      subject: "Tix Movie ", // Subject line
      attachDataUrls: true, //to accept base64 content in messsage
      html: content, // html body
    });
  } catch (error) {
    console.log(error);
  }
};
sendMail();
