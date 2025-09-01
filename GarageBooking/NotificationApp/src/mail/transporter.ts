import nodemailer from "nodemailer";
import { config } from "@/config";
import { logger } from "@/logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await transporter.sendMail({
    from: config.mail.from,
    to,
    subject,
    text,
  });
  logger.info(`[✔] Email sent to ${to}`);
}
