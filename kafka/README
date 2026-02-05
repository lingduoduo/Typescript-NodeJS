### Basic Terminology and Architecture

Events are placed on a queue when they occur. We call the server or process responsible for putting these events on the queue the producer. Downstream, we have a server that reads events off the queue and updates the website. We call this the consumer.

A logical solution is to distribute the items in the queue based on the system they are associated with. This way, all events for a single game are processed in order because they exist on the same queue. This is one of the fundamental ideas behind Kafka: messages sent and received through Kafka require a user specified distribution strategy.

A Kafka cluster is made up of multiple **brokers**. These are just individual servers (they can be physical or virtual). Each broker is responsible for storing data and serving clients. The more brokers you have, the more data you can store and the more clients you can serve.

Each broker has a number of partitions. Each **partition** is an ordered, immutable sequence of messages that is continually appended to -- think of like a log file. Partitions are the way Kafka scales as they allow for messages to be consumed in parallel.

A **topic** is just a logical grouping of partitions. Topics are the way you publish and subscribe to data in Kafka. When you publish a message, you publish it to a topic, and when you consume a message, you consume it from a topic. Topics are always multi-producer; that is, a topic can have zero, one, or many producers that write data to it.

Last up we have our producers and consumers. **Producers** are the ones who write data to topics, and **consumers** are the ones who read data from topics. While Kafka exposes a simple API for both producers and consumers, the creation and processing of messages is on you, the developer. Kafka doesn't care what the data is, it just stores and serves it.

Importantly, you can use Kafka as either a message queue or a stream. Frankly, the distinction here is minor. The only meaningful difference is with how consumers interact with the data. In a message queue, consumers read messages from the queue and then acknowledge that they have processed the message. In a stream, consumers read messages from the stream and then process them, but they don't acknowledge that they have processed the message. This allows for more complex processing of the data.

```
docker run -d --name kafka \
  -p 9092:9092 \
  apache/kafka:4.1.1
docker logs -f kafka

brew install kafka
kafka-topics --version

kafka-topics \
  --bootstrap-server localhost:9092 \
  --create \
  --topic my_topic \
  --partitions 1 \
  --replication-factor 1

kafka-topics --bootstrap-server localhost:9092 --list

kafka-console-producer \
  --bootstrap-server localhost:9092 \
  --topic my_topic \
  --property parse.key=true \
  --property key.separator=:


kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic my_topic \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "

npm install kafkajs

npx ts-node producer.ts


```

