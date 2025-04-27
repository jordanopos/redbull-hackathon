import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService, PrismaService],
  exports: [MailService],
})
export class MailModule {}
