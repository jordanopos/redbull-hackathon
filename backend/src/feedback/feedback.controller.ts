import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  async getAllFeedback(@Query('hackathonId') hackathonId?: string, @Query('participantId') participantId?: string) {
    if (hackathonId) {
      return this.feedbackService.findByHackathon(hackathonId);
    } else if (participantId) {
      return this.feedbackService.findByParticipant(participantId);
    } else {
      return this.feedbackService.findAll();
    }
  }

  @Get('hackathon/:id')
  async getFeedbackByHackathon(@Param('id') hackathonId: string) {
    return this.feedbackService.findByHackathon(hackathonId);
  }


  @Get('participant/:id')
  async getFeedbackByParticipant(@Param('id') participantId: string) {
    return this.feedbackService.findByParticipant(participantId);
  }
}
