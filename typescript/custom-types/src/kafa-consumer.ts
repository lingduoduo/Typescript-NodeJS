import { KafkaConfigFactory } from '../../lib/kafka-config-factory';
import { KafkaConsumer } from '../../lib/kafka-consumer';
import LoggerFactory from '../../../src/lib/util/logger';
import { createMechanism } from '@jm18457/kafkajs-msk-iam-authentication-mechanism';
import { Config } from '../../lib/util/config';
import { name as serviceName } from '../../../package.json';
import {
  DEFAULT_AWS_REGION,
  KAFKA_RECONCILIATION_TOPIC,
  KAFKA_TOPIC,
} from '../../lib/constants';

const logger = LoggerFactory.getLogger(__filename);

const consumerGroupIdMap = {
  [KAFKA_TOPIC]: serviceName,
  [KAFKA_RECONCILIATION_TOPIC]: `${serviceName}-reconcile`,
};

export class KafkaConsumerReactor {
  private messageHandler: (message: any) => any;
  private configFactory: KafkaConfigFactory;
  private consumer: KafkaConsumer | undefined;
  private config: Config;

  /**
   * Constructs a KafkaConsumerReactor instance.
   * @param topic - The Kafka topic to consume from.
   * @param messageHandler - The function to handle incoming messages.
   */
  constructor(topic: string, messageHandler: (message: any) => any) {
    this.messageHandler = messageHandler;
    this.config = new Config();

    const serviceNameToUse = consumerGroupIdMap[topic] || serviceName;

    const kafkaConfig = {
      clusterName: this.config.get('KAFKA_CLUSTER'),
      topic: topic,
      kafka: {
        clientId: serviceNameToUse,
      },
      groupId: serviceNameToUse,
    };

    this.configFactory = new KafkaConfigFactory(kafkaConfig);
  }

  /**
   * Starts the Kafka consumer.
   */
  async start() {
    if (this.consumer) {
      logger.info('Kafka consumer already started. Skipping start.');
      return;
    }

    logger.info('Starting Kafka consumer');
    logger.info(`Kafka config: ${JSON.stringify(this.configFactory)}`);

    const saslMechanism = createMechanism({
      region:
        process.env.AWS_MSK_REGION ||
        process.env.AWS_REGION ||
        DEFAULT_AWS_REGION,
    });

    const consumerConfig = await this.configFactory.getKafkaConfig(saslMechanism);

    logger.info(`Kafka consumer config: ${JSON.stringify(consumerConfig)}`);

    this.consumer = new KafkaConsumer(consumerConfig);
    this.consumer.messageHandler = this.messageHandler;

    await this.consumer.connect();
    await this.consumer.consume();
  }

  /**
   * Stops the Kafka consumer.
   */
  async stop() {
    if (this.consumer) {
      await this.consumer.disconnect();
      this.consumer = undefined;
      logger.info('Kafka consumer stopped.');
    }
  }
}

module.exports = { KafkaConsumerReactor };
