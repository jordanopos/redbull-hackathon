import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';

@Injectable()
export class HackathonService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHackathonDto) {
    // Check if urlSlug already exists
    const existingHackathon = await this.prisma.hackathon.findUnique({
      where: { urlSlug: data.urlSlug },
    });

    if (existingHackathon) {
      throw new ConflictException('A hackathon with this URL slug already exists');
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
        throw new ConflictException('A hackathon with this URL slug already exists');
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
        throw new ConflictException('Participant is already registered for this hackathon');
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
        throw new NotFoundException('Participant is not registered for this hackathon');
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

    return participants.map(hp => hp.participant);
  }
}
