import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// קונפיגורציה של שרת המייל
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pearly0242@gmail.com',
    pass: 'pearl1234!'
  }
});

const sendEmail = (toEmail, subject, htmlContent) => {
  const mailOptions = {
    from: 'pearly0242@gmail.com',
    to: toEmail,
    subject: subject,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

app.post('/sendEmail', (req, res) => {
  const { email, name, phone, address } = req.body;
  const subject = 'Order Details';
  const htmlContent = `
    <h1>Order Details</h1>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Address: ${address}</p>
  `;
  sendEmail(email, subject, htmlContent);
  res.send('Email sent successfully!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default sendEmail;