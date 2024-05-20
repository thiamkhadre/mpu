const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();
const port = process.env.PORT || 5000;
const serveHandler = require("serve-handler");

app.use(route)

route.post("/send-mail", (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "abdoulkhadrethiam8@gmail.com",
          pass: process.env.MAIL_PASS
        },
      });
      console.log(">>>>",process.env.MAIL_PASS)

    const mailData = {
        from: `${req.body.name} <${req.body.email}>`,
        to: 'mpu4you@web.de',
        subject: 'MPU Request',
        text: `From: ${req.body.name}
               Phone Number: ${req.body.tel}
               Email: ${req.body.email}`,
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err)
        res.redirect('/danke.html')
    });
})

route.get("*", (req, res) => {
    serveHandler(req, res, {
        cleanUrls: true
    })
})

app.listen(port);

module.exports = app