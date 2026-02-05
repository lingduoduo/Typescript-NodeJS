import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function run() {
  await producer.connect();

  await producer.send({
    topic: "my_topic",
    messages: [
      { key: "key1", value: "Hello, Kafka with key!" },
      { key: "key2", value: "Another message with a different key" },
    ],
  });

  console.log("✅ Messages sent");
  await producer.disconnect();
}

run().catch(console.error);
