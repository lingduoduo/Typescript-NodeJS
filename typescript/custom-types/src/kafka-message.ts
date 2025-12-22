import ClientData from '../../lib/sor/data';
import LoggerFactory from '../../../src/lib/util/logger';
const logger = LoggerFactory.getLogger(__filename);
import { SolrIndexClient } from '../../clients/solr';
import { Config } from '../../lib/util/config';
import { SearchDefinition } from '@lifion/ml-search-commons/dist/src/types/search-definition';
import { SolrDocumentGenerator } from '../../lib/sor/solr-data-mapper';
import { getPipelineName } from '../../lib/util/properties';
import Logger from '@lifion/logger';
import {
  MILVUS_COLLECTION,
  ACTION_ID,
  CLMEventType,
  INDEXING_ASSOCIATE_ID,
  MultilingualMap,
} from '../../../src/lib/constants';
import { LifionClientCLC } from '../../clients/lifion-client-clc';
import { LANGUAGE_DEFAULT, CONTEXT_DEFAULT } from '../../../src/lib/constants';
import { ActionLinkPipeline } from '../../clients/metadata/action-link';
import { SystemActorRequest } from '../../lib/system-actor';

// Class Declaration
export class KafkaMessageProcessor {
  dataProvider: ClientData;
  solrClient: SolrIndexClient;
  config: Config;
  generator: SolrDocumentGenerator;
  definition: SearchDefinition;
  clientIds: string[];

  constructor(config: Config, definition: SearchDefinition, clientIds: string[]) {
    this.definition = definition;
    this.dataProvider = new ClientData(definition);
    const pipelineName = getPipelineName(definition);
    this.solrClient = new SolrIndexClient(pipelineName);
    this.generator = new SolrDocumentGenerator(definition);
    this.config = config;
    this.clientIds = clientIds;
  }

  /**
   * Updates the list of client IDs.
   * @param clientIds - Array of client IDs to set.
   */
  public setClientIDs(clientIds: string[]) {
    this.clientIds = clientIds;
  }

  /**
   * Processes a Kafka message.
   * @param kafkaMessage - Kafka message containing topic and value.
   */
  public async processMessage(kafkaMessage: any) {
    const { topic, message } = kafkaMessage;
    const value = JSON.parse(message.value.toString());
    const { clientId, inputParameters, traceId, eventType } = value;

    const headers: Record<string, string> = {};
    headers['traceId'] = traceId;
    headers['searchId'] = this.definition.objectId;
    headers['searchName'] = this.definition.name;

    // Log the start of processing
    logger.info(
      {
        [Logger.symbols.context]: {
          associateId: `${INDEXING_ASSOCIATE_ID}-${headers['searchName']}`,
          clientId,
          traceId: headers['traceId'],
        },
      },
      `Processing message for ${headers['searchId']}:${headers['searchName']} for client ${clientId}`
    );

    // Check if the client ID is authorized
    if (!this.clientIds.includes(clientId)) {
      logger.warn(
        {
          [Logger.symbols.context]: {
            associateId: `${INDEXING_ASSOCIATE_ID}-${headers['searchName']}`,
            clientId,
            traceId: headers['traceId'],
          },
        },
        `Feature is not turned on for client with id ${clientId}`
      );
      return;
    }

    // If the definition objectId matches ACTION_ID, process actions
    if (this.definition.objectId === ACTION_ID) {
      return await this._processMessageForActions(clientId, inputParameters, headers, eventType);
    }

    // Additional processing can be added here if needed
  }

  // Add the implementation for `_processMessageForActions` if not already defined
}
