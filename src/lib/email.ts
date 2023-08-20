import nodeMailer, { type SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

export async function sendAccountAuthCodeEmail(
  to: string,
  authCode: string,
): Promise<SentMessageInfo> {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const res = await transporter.sendMail({
    to,
    subject: "Concerts: Auth Code",
    html: `${authCode}`,
  });
  return res;
}
