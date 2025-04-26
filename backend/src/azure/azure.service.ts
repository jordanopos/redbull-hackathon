import { Injectable } from '@nestjs/common';
import { AIProjectsClient, MessageTextContentOutput } from '@azure/ai-projects';
import { DefaultAzureCredential } from '@azure/identity';
import axios from 'axios';

@Injectable()
export class AzureService {
  private readonly azureOpenAiBaseUrl =
    'https://redbull8761326230.openai.azure.com/';
  private readonly apiKey =
    'BZr8ZDsXNVDWeKCpQI0JYthTpJt34ASvvcdYKy5SzDcaZkBdxMW4JQQJ99BDACMsfrFXJ3w3AAAAACOGuXKL'; // Replace with your actual API key or use environment variables
  private readonly apiVersion = '2023-05-15'; // Use the appropriate API version
  private readonly deploymentName = 'gpt-4'; // Replace with your deployment name

  async runAgentConversation(prompt: string) {
    const client = AIProjectsClient.fromConnectionString(
      'westus3.api.azureml.ms;c5d47662-af4d-400e-ace6-ff70828d7d98;AZ-CSI-Grp5;givesyouwings',
      new DefaultAzureCredential({}),
    );

    const agent = await client.agents.getAgent('asst_dqFttLeDyKGaPTxTiX8zqgay');
    console.log(`Retrieved agent: ${agent.name}`);

    const thread = await client.agents.createThread();

    console.log(`Retrieved thread, thread ID: ${thread.id}`);

    const message = await client.agents.createMessage(thread.id, {
      role: 'user',
      content: prompt,
    });
    console.log(`Created message, message ID: ${message.id}`);

    // Create run
    let run = await client.agents.createRun(thread.id, agent.id);

    // Poll until the run reaches a terminal status
    while (run.status === 'queued' || run.status === 'in_progress') {
      // Wait for a second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await client.agents.getRun(thread.id, run.id);
    }

    console.log(`Run completed with status: ${run.status}`);

    // Retrieve messages
    const messages = await client.agents.listMessages(thread.id);

    // // Display messages
    // for (const dataPoint of messages.data.reverse()) {
    //   console.log(`${dataPoint.createdAt} - ${dataPoint.role}:`);
    //   for (const contentItem of dataPoint.content) {
    //     if (contentItem.type === 'text') {
    //       console.log(contentItem.type);
    //     }
    //   }
    // }

    const content = messages.data[0].content as Array<MessageTextContentOutput>;

    return content[0].text.value;
  }

  async generateCompletion(prompt: string) {
    try {
      const endpoint = `${this.azureOpenAiBaseUrl}openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`;

      const response = await axios.post(
        endpoint,
        {
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 800,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey,
          },
        },
      );

      return {
        success: true,
        data: response.data.choices[0].message.content,
        usage: response.data.usage,
      };
    } catch (error) {
      console.error(
        'Error generating completion:',
        error.response?.data || error.message,
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }
}
