import { initRabbit } from "@/messaging/rabbit";
import { startConsumer } from "@/messaging/consumer";
import { logger } from "@/logger";

async function main() {
  const channel = await initRabbit();
  await startConsumer(channel);
}

main().catch((err) => {
  logger.error("Fatal error:", err);
  process.exit(1);
});
