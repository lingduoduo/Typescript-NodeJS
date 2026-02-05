import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "demo-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "my_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `[${topic} p${partition}] key=${message.key?.toString()} value=${message.value?.toString()}`
      );
    },
  });
}

run().catch(console.error);
