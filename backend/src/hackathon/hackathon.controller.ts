import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HackathonService } from './hackathon.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';

@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post()
  async create(@Body() createHackathonDto: CreateHackathonDto) {
    return this.hackathonService.create(createHackathonDto);
  }

  @Get()
  async findAll() {
    return this.hackathonService.findAll();
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.hackathonService.findByUrlSlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hackathonService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHackathonDto: UpdateHackathonDto,
  ) {
    return this.hackathonService.update(id, updateHackathonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.hackathonService.remove(id);
  }

  @Get(':id/participants')
  async getParticipants(@Param('id') id: string) {
    return this.hackathonService.getParticipants(id);
  }

  @Post(':id/participants')
  async addParticipant(
    @Param('id') hackathonId: string,
    @Body() body: { participantId: string },
  ) {
    return this.hackathonService.addParticipant(
      hackathonId,
      body.participantId,
    );
  }

  @Delete(':id/participants/:participantId')
  async removeParticipant(
    @Param('id') hackathonId: string,
    @Param('participantId') participantId: string,
  ) {
    return this.hackathonService.removeParticipant(hackathonId, participantId);
  }
}
