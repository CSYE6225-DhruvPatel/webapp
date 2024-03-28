import {PubSub} from '@google-cloud/pubsub';
import dotenv from "dotenv";

dotenv.config();

export const publishUserData = async ({
    projectId = process.env.GCP_PROJECT,
    topicName = process.env.PUBSUB_TOPIC, 
    userData}
  ) => {
    const pubsub = new PubSub({ projectId });
    const topic = pubsub.topic(topicName);
    // Send the user data message to the topic
    const messageId = await topic.publishMessage({ data: Buffer.from(JSON.stringify(userData)) });
    console.log(`User data message published with ID: ${messageId}`);
  }
