import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs'

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

let config = {
  host: "smtp.gmail.com",
  service:"gmail",
  port: 587, // Use 465 for SSL or 587 for TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  }
}


function createTransporter(config:any){
    return nodemailer.createTransport(config)
}

export async function sendEmail(messageOption: any) {
  let transporter = createTransporter(config);

    await transporter.verify();

    await transporter.sendMail(messageOption, (err,info)=>{
        if(err){
            console.log(err);
            
        }

        console.log(info);
        
    })
}
