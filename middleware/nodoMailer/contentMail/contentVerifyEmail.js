const { generateBcrypt } = require("../../Bcrypt");

const contentVerifyEmail = (req, res, next) => {
  const { email } = req.body;
  const { userRegister } = req;
  try {
    const hashEmail = generateBcrypt(email);
    const link = `${req.protocol}:/${req.get("host")}/api/v1/users/verify?id=${
      userRegister.id
    }&&email=${hashEmail}`;

    const content =
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>";
    req.sendMail = content;
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  contentVerifyEmail,
};
