import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { HackathonModule } from './hackathon/hackathon.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AzureModule } from './azure/azure.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [HackathonModule, FeedbackModule, AzureModule, MailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
