import { Module } from '@nestjs/common';
import { HackathonController } from './hackathon.controller';
import { HackathonService } from './hackathon.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports : [MailModule],
  controllers: [HackathonController],
  providers: [HackathonService, PrismaService],
  exports: [HackathonService]
})
export class HackathonModule {}
