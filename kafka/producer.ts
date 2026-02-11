import { Kafka, logLevel, CompressionTypes } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
  // Optional: reduce noise / tune logging
  logLevel: logLevel.INFO,
});

const producer = kafka.producer({
  // Idempotent producer => stronger guarantees with proper settings
  idempotent: true,
  maxInFlightRequests: 1, // recommended with idempotent producers
  allowAutoTopicCreation: false, // safer in prod
  retry: {
    retries: 10,
    initialRetryTime: 200,
    factor: 0.2,
    multiplier: 2,
    maxRetryTime: 30_000,
  },
});

let shuttingDown = false;

async function sendMessages() {
  await producer.send({
    topic: "my_topic",
    acks: -1, // wait for all in-sync replicas
    timeout: 30_000,
    compression: CompressionTypes.GZIP, // or SNAPPY/LZ4 depending on your cluster
    messages: [
      { key: "key1", value: "Hello, Kafka with key!" },
      { key: "key2", value: "Another message with a different key" },
    ],
  });
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n🧹 Received ${signal}. Shutting down gracefully...`);
  try {
    await producer.disconnect();
    console.log("✅ Producer disconnected");
  } catch (err) {
    console.error("❌ Error during disconnect:", err);
  } finally {
    process.exit(0);
  }
}

async function run() {
  // Connect once (keep it open if you’re sending continuously)
  await producer.connect();

  // Graceful shutdown hooks
  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));

  await sendMessages();
  console.log("✅ Messages sent");

  // If this is a one-shot script, disconnect here.
  // If this is a service, DON'T disconnect; keep producer open and reuse it.
  await producer.disconnect();
}

run().catch(async (err) => {
  console.error("❌ Fatal error:", err);
  try {
    await producer.disconnect();
  } catch {}
  process.exit(1);
});
