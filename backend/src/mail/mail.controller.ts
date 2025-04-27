import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

// DTO for direct email sending
class SendEmailDto {
  content: string;
  subject: string;
  recipient: string;
}

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    // Create a simple HTML email from the content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        ${sendEmailDto.content}
      </div>
    `;

    // Use the mailer service to send the email
    return this.mailService.sendMail({
      email: sendEmailDto.recipient,
      subject: sendEmailDto.subject,
      template: htmlContent,
    });
  }
}
