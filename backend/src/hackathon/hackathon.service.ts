import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { HackathonStatsDto } from './dto/hackathon-stats.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class HackathonService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(data: CreateHackathonDto) {
    // Check if urlSlug already exists
    const existingHackathon = await this.prisma.hackathon.findUnique({
      where: { urlSlug: data.urlSlug },
    });

    if (existingHackathon) {
      throw new ConflictException(
        'A hackathon with this URL slug already exists',
      );
    }

    return this.prisma.hackathon.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.hackathon.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id },
      include: {
        participants: {
          include: {
            participant: true,
          },
        },
        feedback: {
          include: {
            participant: true,
          },
        },
      },
    });

    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }

    return hackathon;
  }

  async findByUrlSlug(urlSlug: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { urlSlug },
      include: {
        participants: {
          include: {
            participant: true,
          },
        },
        feedback: {
          include: {
            participant: true,
          },
        },
      },
    });

    if (!hackathon) {
      throw new NotFoundException(`Hackathon with slug ${urlSlug} not found`);
    }

    return hackathon;
  }

  async update(id: string, data: UpdateHackathonDto) {
    // If updating urlSlug, check if it already exists
    if (data.urlSlug) {
      const existingHackathon = await this.prisma.hackathon.findFirst({
        where: {
          urlSlug: data.urlSlug,
          id: { not: id },
        },
      });

      if (existingHackathon) {
        throw new ConflictException(
          'A hackathon with this URL slug already exists',
        );
      }
    }

    try {
      return await this.prisma.hackathon.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Hackathon with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.hackathon.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Hackathon with ID ${id} not found`);
      }
      throw error;
    }
  }

  async addParticipant(hackathonId: string, participantId: string) {
    try {
      return await this.prisma.hackathonParticipant.create({
        data: {
          hackathonId,
          participantId,
        },
        include: {
          participant: true,
          hackathon: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Participant is already registered for this hackathon',
        );
      }
      throw error;
    }
  }

  async removeParticipant(hackathonId: string, participantId: string) {
    try {
      return await this.prisma.hackathonParticipant.delete({
        where: {
          hackathonId_participantId: {
            hackathonId,
            participantId,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // P2025 is Prisma's "Record not found" error code
        // This occurs when trying to delete a record that doesn't exist
        throw new NotFoundException(
          'Participant is not registered for this hackathon',
        );
      }
      throw error;
    }
  }

  async getParticipants(hackathonId: string) {
    const participants = await this.prisma.hackathonParticipant.findMany({
      where: {
        hackathonId,
      },
      include: {
        participant: true,
      },
    });

    return participants.map((hp) => hp.participant);
  }

  async getHackathonStats(hackathonId: string): Promise<HackathonStatsDto> {
    // First, check if the hackathon exists
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${hackathonId} not found`);
    }

    // Count total participants
    const totalSignups = await this.prisma.hackathonParticipant.count({
      where: { hackathonId },
    });

    // Count total feedback submissions
    const totalFeedback = await this.prisma.feedback.count({
      where: { hackathonId },
    });

    // Calculate completion rate (percentage of participants who submitted feedback)
    const completionRate =
      totalSignups > 0 ? Math.round((totalFeedback / totalSignups) * 100) : 0;

    return {
      totalSignups,
      totalFeedback,
      completionRate,
    };
  }

  async createAndAddParticipant(
    hackathonId: string,
    createParticipantDto: CreateParticipantDto,
  ) {
    // Check if the hackathon exists
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${hackathonId} not found`);
    }

    // Check if participant already exists with this email
    let participant = await this.prisma.participant.findUnique({
      where: { email: createParticipantDto.email },
    });

    let isNewParticipant = false;
    let participantId = participant?.id;

    // Create transaction to ensure data consistency
    const hackathonParticipant = await this.prisma.$transaction(async (prisma) => {
      // If participant doesn't exist, create them
      if (!participant) {
        isNewParticipant = true;
        participant = await prisma.participant.create({
          data: createParticipantDto,
        });
        participantId = participant.id;
      }

      // Check if participant is already registered for this hackathon
      const existingRegistration = await prisma.hackathonParticipant.findUnique(
        {
          where: {
            hackathonId_participantId: {
              hackathonId,
              participantId: participant.id,
            },
          },
        },
      );

      if (existingRegistration) {
        throw new ConflictException(
          'Participant is already registered for this hackathon',
        );
      }

      // Create hackathon participant association
      return prisma.hackathonParticipant.create({
        data: {
          hackathonId,
          participantId: participant.id,
        },
        include: {
          participant: true,
          hackathon: true,
        },
      });
    });

    // // Now that the transaction is complete, send the email
    // await this.mailService.sendParticipantEmail(
    //   participantId,
    //   hackathon.id,
    //   'registration',
    // );

    return hackathonParticipant;
  }
}
