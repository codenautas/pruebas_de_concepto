import * as nodemailer from "nodemailer";

import {user, email, pass, name} from "./local-config";

const confirmationCode = 'asd9as9351325132AS';

async function main(){

    const transport = nodemailer.createTransport({
        host: "smtp.dreamhost.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user,
            pass,
        }
    });
    

    await transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
            </div>`,
    });
}

main().then(function(){
    console.log('ok');
}, function(err){
    console.error(err);
})