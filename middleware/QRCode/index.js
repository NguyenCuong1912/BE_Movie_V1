var QRCode = require("qrcode");
const generateQRcode = async (detail) => {
  let QrCode_img = await QRCode.toDataURL(
    "data invoice untuk di kirim melalui email"
  );
  return QrCode_img;
};

module.exports = {
  generateQRcode,
};
