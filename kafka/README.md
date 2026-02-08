### Basic Terminology and Architecture

Events are placed on a queue when they occur. We call the server or process responsible for putting these events on the queue the producer. Downstream, we have a server that reads events off the queue and updates the website. We call this the consumer.

A logical solution is to distribute the items in the queue based on the system they are associated with. This way, all events for a single game are processed in order because they exist on the same queue. This is one of the fundamental ideas behind Kafka: messages sent and received through Kafka require a user specified distribution strategy.

A Kafka cluster is made up of multiple **brokers**. These are just individual servers (they can be physical or virtual). Each broker is responsible for storing data and serving clients. The more brokers you have, the more data you can store and the more clients you can serve.

Each broker has a number of partitions. Each **partition** is an ordered, immutable sequence of messages that is continually appended to -- think of like a log file. Partitions are the way Kafka scales as they allow for messages to be consumed in parallel.

A **topic** is just a logical grouping of partitions. Topics are the way you publish and subscribe to data in Kafka. When you publish a message, you publish it to a topic, and when you consume a message, you consume it from a topic. Topics are always multi-producer; that is, a topic can have zero, one, or many producers that write data to it.

Last up we have our producers and consumers. **Producers** are the ones who write data to topics, and **consumers** are the ones who read data from topics. While Kafka exposes a simple API for both producers and consumers, the creation and processing of messages is on you, the developer. Kafka doesn't care what the data is, it just stores and serves it.

Importantly, you can use Kafka as either a message queue or a stream. Frankly, the distinction here is minor. The only meaningful difference is with how consumers interact with the data. In a message queue, consumers read messages from the queue and then acknowledge that they have processed the message. In a stream, consumers read messages from the stream and then process them, but they don't acknowledge that they have processed the message. This allows for more complex processing of the data.

```
docker run -d --name kafka -p 9092:9092 apache/kafka:4.1.1

docker logs -f kafka

brew install kafka

kafka-topics --version
```

### Deep Dive Under the Hood

1. Producer create and publishes a message

When a message is published to a Kafka topic, Kafka first determines the appropriate partition for the message. This partition selection is critical because it influences the distribution of data across the cluster. This is a two-step process:

- Partition Determination: Kafka uses a partitioning algorithm that hashes the message key to assign the message to a specific partition. If the message does not have a key, Kafka can either round-robin the message to partitions or follow another partitioning logic defined in the producer configuration. This ensures that messages with the same key always go to the same partition, preserving order at the partition level.

- Broker Assignment: Once the partition is determined, Kafka then identifies which broker holds that particular partition. The mapping of partitions to specific brokers is managed by the Kafka cluster metadata, which is maintained by the Kafka controller (a role within the broker cluster). The producer uses this metadata to send the message directly to the broker that hosts the target partition.

```
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

```

2. Kafka assigns the message to the correct topic, broker and partition

![Partition diagram](partition.png)

Each partition in Kafka functions essentially as an append-only log file. Messages are sequentially added to the end of this log, which is why Kafka is commonly described as a distributed commit log. This append-only design is central to Kafka’s architecture, providing several important benefits:
- Immutability: Once written, messages in a partition cannot be altered or deleted. This immutability is crucial for Kafka’s performance and reliability. It simplifies replication, speeds up recovery processes, and avoids consistency issues common in systems where data can be changed.
- Efficiency: By restricting operations to appending data at the end of the log, Kafka minimizes disk seek times, which are a major bottleneck in many storage systems.
- Scalability: The simplicity of the append-only log mechanism facilitates horizontal scaling. More partitions can be added and distributed across a cluster of brokers to handle increasing loads, and each partition can be replicated across multiple brokers to enhance fault tolerance.

3. Message appended to partition via append only log file

Partition A, B...  -> Msg A, B... -> Offsets

Each message in a Kafka partition is assigned a unique offset, which is a sequential identifier indicating the message’s position in the partition. This offset is used by consumers to track their progress in reading messages from the topic. As consumers read messages, they maintain their current offset and periodically commit this offset back to Kafka. This way, they can resume reading from where they left off in case of failure or restart.

Once a message is published to the designated partition, Kafka ensures its durability and availability through a robust replication mechanism. Kafka employs a leader-follower model for replication, which works as follows:

- Leader Replica Assignment: Each partition has a designated leader replica, which resides on a broker. This leader replica is responsible for handling all read and write requests for the partition. The assignment of the leader replica is managed centrally by the cluster controller, which ensures that each partition’s leader replica is effectively distributed across the cluster to balance the load.
- Follower Replication: Alongside the leader replica, several follower replicas exist for each partition, residing on different brokers. These followers do not handle direct client requests; instead, they passively replicate the data from the leader replica. By replicating the messages received by the leader replica, these followers act as backups, ready to take over should the leader replica fail.
- Synchronization and Consistency: Followers continuously sync with the leader replica to ensure they have the latest set of messages appended to the partition log. This synchronization is crucial for maintaining consistency across the cluster. If the leader replica fails, one of the follower replicas that has been fully synced can be quickly promoted to be the new leader, minimizing downtime and data loss.
- Controller's Role in Replication: The controller within the Kafka cluster manages this replication process. It monitors the health of all brokers and manages the leadership and replication dynamics. When a broker fails, the controller reassigns the leader role to one of the in-sync follower replicas to ensure continued availability of the partition.

4. Consumers read next message based on an offset

consumers read messages from Kafka topics using a pull-based model. Unlike some messaging systems that push data to consumers, Kafka consumers actively poll the broker for new messages at intervals they control. As explained by Apache Kafka's official documentation, this pull approach was a deliberate design choice that provides several advantages: it lets consumers control their consumption rate, simplifies failure handling, prevents overwhelming slow consumers, and enables efficient batching.

```
kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic my_topic \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "

npm install kafkajs

npx ts-node producer.ts
```
