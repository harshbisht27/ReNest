const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


const EmailSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Email = mongoose.model('Email', EmailSchema);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('Server is ready to send emails.');
  }
});


app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  
  try {
    const newEmail = new Email({
      name,
      email,
      subject,
      message
    });

    await newEmail.save();

    
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO, 
      subject: `Contact Form: ${subject}`,
      text: `You have a new message from: \n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email to the recipient
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ success: false, message: 'Error sending email', error: error.message });
      } else {
        console.log('Email sent to recipient: ' + info.response);

        
        const confirmationMailOptions = {
          from: process.env.EMAIL_TO, 
          to: email, 
          subject: 'Confirmation: Your message has been received',
          text: `Hi ${name},\n\nThank you for your message!\n\nWe have received your message and will get back to you shortly.\n\nSubject: ${subject}\n\nMessage: ${message}\n\nBest regards,\nYour Company Name`
        };

        
        transporter.sendMail(confirmationMailOptions, (error, info) => {
          if (error) {
            console.error('Error sending confirmation email:', error);
            return res.status(500).send({ success: false, message: 'Error sending confirmation email', error: error.message });
          } else {
            console.log('Confirmation email sent: ' + info.response);
            return res.status(200).send({ success: true, message: 'Email sent successfully and data saved' });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    return res.status(500).send({ success: false, message: 'Error saving data', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
