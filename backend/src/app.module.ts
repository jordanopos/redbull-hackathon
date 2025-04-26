import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MailerModule } from './mailer/mailer.module';
import { HackathonModule } from './hackathon/hackathon.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AzureModule } from './azure/azure.module';

@Module({
  imports: [MailerModule, HackathonModule, FeedbackModule, AzureModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
