const nodemailer = require("nodemailer");

let send = async (args) => {
 try {
 
   let testAccount = await nodemailer.createTestAccount();


   let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com.",
     port: 587,
     secure: false, 
     auth: {
       user: "testerme167@gmail.com", 
       pass: "testerme123456" 
     }
   });

   console.log("arggs",args)
   
   let info = await transporter.sendMail({
     from: '"movieapp" <myfirstapp@example.com>', // sender address
     to: args.to, // list of receivers
     subject: args.subject, // Subject line
     html: args.body // html body or json body m pass kr skta hu 
   });

   console.log("Message sent: %s", info.messageId);

   console.log(nodemailer.getTestMessageUrl(info));
   return nodemailer.getTestMessageUrl(info);
   
 } catch (err) {
   console.log(`Error: ${err}`);
 }
};

module.exports = {
 send
};