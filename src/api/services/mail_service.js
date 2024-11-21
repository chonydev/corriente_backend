const nodemailer = require("nodemailer");

const { ConfidentialClientApplication } = require("@azure/msal-node");


const TRANSPORTER_OPTIONS = {
  host: 'localhost',//'smtp.gmail.com', // SMTP host
  //port – is the port to connect to (defaults to 587 if is secure is false or 465 if true)
  port: 587, // Secure port for TLS
  secure: false, // Use TLS (set to true for port 465)
  //If authentication data is not present, the connection is considered authenticated from the start. O
  //^ requireTLS: true,
  auth: {
    user: '', // Your email
    pass: 'my-gmail-password', // Your app password (not your Gmail password)
  },
  debug: true, // Enable debug information in logs
  logger: true, // Log debug information
};
//^ check : Set secure: true (for port 465) or requireTLS: true (for port 587) to enforce TLS encryption.

const TRANSPORTER_MAIL = nodemailer.createTransport(TRANSPORTER_OPTIONS);

const EMAIL_OPTIONS = {
  from: '"LuzYFuerza" <>', // Sender's name and email
  to: 'recipient@example.com', // Recipient email
  subject: 'LuzYFuerza: Password Reset', // Subject line
  text: 'Temp code + text', // Plain text body
  // html: '<b>Temp code + text</b>', // Optional HTML body
};

async function main() {
  try {
    const info = await TRANSPORTER_MAIL.sendMail(EMAIL_OPTIONS);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

