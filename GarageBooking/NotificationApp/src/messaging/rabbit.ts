import amqp, { Channel } from "amqplib";
import { config } from "@/config";
import { logger } from "@/logger";

export async function initRabbit(): Promise<Channel> {
  const conn = await amqp.connect(config.rabbitmqUrl);
  const channel = await conn.createChannel();

  await channel.assertExchange(config.exchange, "topic", { durable: true });
  await channel.assertQueue(config.queue, { durable: true });

  await channel.bindQueue(config.queue, config.exchange, "application.*");
  await channel.bindQueue(config.queue, config.exchange, "payment.succeeded");

  logger.info("[*] Connected to RabbitMQ");

  return channel;
}
