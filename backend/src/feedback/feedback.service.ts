import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFeedbackDto) {
    let participantId: string;

    const participant = await this.prisma.participant.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!participant) {
      const newParticipant = await this.prisma.participant.create({
        data: {
          email: data.email,
          firstName: 'Anonymous',
          lastName: 'Anonymous',
          school: 'UWM',
        },
      });

      participantId = newParticipant.id;
    } else {
      participantId = participant.id;
    }

    // Check if the participant is already registered for this hackathon
    const existingRegistration =
      await this.prisma.hackathonParticipant.findUnique({
        where: {
          hackathonId_participantId: {
            hackathonId: data.hackathonId,
            participantId,
          },
        },
      });

    // If not registered, create the hackathon-participant relationship
    if (!existingRegistration) {
      await this.prisma.hackathonParticipant.create({
        data: {
          hackathonId: data.hackathonId,
          participantId,
        },
      });
    }

    const { email, ...feedbackData } = data;
    return this.prisma.feedback.create({
      data: { ...feedbackData, participantId },
    });
  }

  async findAll() {
    return this.prisma.feedback.findMany({
      include: {
        participant: true,
        hackathon: true,
      },
    });
  }

  async findByHackathon(hackathonId: string) {
    return this.prisma.feedback.findMany({
      where: {
        hackathonId,
      },
      include: {
        participant: true,
      },
    });
  }

  async findByParticipant(participantId: string) {
    return this.prisma.feedback.findMany({
      where: {
        participantId,
      },
      include: {
        hackathon: true,
      },
    });
  }
}
