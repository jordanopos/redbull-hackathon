import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AzureService } from './azure.service';
import { formatPrompt, PROMPTS } from 'utils/prompts';

import { Response } from 'express';

@Controller('azure')
export class AzureController {
  constructor(private readonly azureService: AzureService) {}

  @Get('completion')
  async sendCompletion() {
    const data = await this.azureService.runAgentConversation(
      'how can you help me',
    );

    return data;
  }

  @Get('feedback-overview')
  async getAiFeedbackData(
    @Query('hackathonId') hackathonId: string,
    @Res() res: Response,
  ) {
    const rawData = await this.azureService.runAgentConversation(
      formatPrompt(PROMPTS.ANALYZE_FEEDBACK, {
        hackathonId: hackathonId,
      }),
    );
    const data = JSON.parse(rawData);

    return res.json(data);
  }
}
