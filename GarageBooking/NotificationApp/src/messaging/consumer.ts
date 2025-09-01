import { Channel } from "amqplib";
import { config } from "@/config";
import { sendEmail } from "@/mail/transporter";
import { buildEmail } from "@/mail/templates";
import { EventMessage } from "@/types/events";
import { logger } from "@/logger";

export async function startConsumer(channel: Channel) {
  await channel.consume(config.queue, async (msg) => {
    if (!msg) return;

    try {
      const event: EventMessage = JSON.parse(msg.content.toString());
      logger.info("[x] Received event:", event);

      const { subject, text, recipient } = buildEmail(event);

      await sendEmail({
        to: recipient,
        subject,
        text,
      });

      channel.ack(msg);
    } catch (err) {
      logger.error("Error processing message:", err);
      channel.nack(msg, false, false);
    }
  });
}
