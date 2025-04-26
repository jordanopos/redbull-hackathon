import { Module } from '@nestjs/common';
import { HackathonController } from './hackathon.controller';
import { HackathonService } from './hackathon.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HackathonController],
  providers: [HackathonService, PrismaService],
  exports: [HackathonService]
})
export class HackathonModule {}
