const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "1ffbc5528b3d04", // generated ethereal user
      pass: "4a3acf73769663", // generated ethereal password
    },
  });
