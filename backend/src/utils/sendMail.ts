import nodemailer from "nodemailer";


const sendMail = async (email: string[], subject: string, message: string) => { // ✅ Fix: Define email as string[]
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    transporter?.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        const mailOptions = {
          from: process.env.SMTP_FROM,
          to: email.join(", "), 
          subject: subject,
          html: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("✅ Email sent: " + info.response);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    console.log("❌ Error sending email");
  }
};



export default sendMail;
