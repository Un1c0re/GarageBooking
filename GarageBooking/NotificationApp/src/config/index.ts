import "dotenv/config";

export const config = {
  rabbitmqUrl: process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672",
  exchange: "events.exchange",
  queue: "notifications.queue",
  mail: {
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
    from: process.env.MAIL_FROM || "garage-app@example.com",
  },
};
