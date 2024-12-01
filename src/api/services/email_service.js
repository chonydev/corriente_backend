//import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import EMAIL_CONSTANTS from '../../constants/email_const.cjs';

import fs from "fs/promises"; 



async function sendPasswordResetEmail(userEmail) {
  
  //console.log(EMAIL_CONSTANTS)
  //^ outside mailerSend it will be better?
  const mailerSend = new MailerSend({
    apiKey: EMAIL_CONSTANTS.API_KEY
  });
  
  const sentFrom = new Sender(EMAIL_CONSTANTS.SENDER, "LuzYFuerza Server");
  const recipients = [
    //new Recipient(EMAIL_CONSTANTS.SENDER, "Dear user")
    new Recipient(userEmail, `Dear user ${userEmail}`)
  ];
  
  const HTML_CONTENT = await fs.readFile("./src/assets/password_reset_view.html", "utf-8");
  
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom) //  tells email clients where responses to the email should be sent, which can differ from the "From" address.
    .setSubject("Password reset request")
    .setHtml(HTML_CONTENT)
    //.setText("Your code to reset password is:");

    return await mailerSend.email.send(emailParams);
    /*
    console.log(mailerSend.email)
    send(params: EmailParams): Promise<APIResponse>; 
    headers body statuscode
    */
}


export default sendPasswordResetEmail;
