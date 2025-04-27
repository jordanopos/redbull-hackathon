import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as React from 'react';
import HackathonRegistrationEmail from '../../emails/hackathon-registration';
import HackathonFeedbackRequestEmail from '../../emails/hackathon-feedback-request';
import { Resend } from 'resend';
import { render } from '@react-email/render';

export type EmailType = 'registration' | 'feedback-request';

export interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
  phoneNumner?: string;
}

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(private prisma: PrismaService) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  /**
   * Send an email to a participant based on hackathon and email type
   * @param participantId - The ID of the participant
   * @param hackathonId - The ID of the hackathon
   * @param emailType - The type of email to send ('registration' or 'feedback-request')
   */
  async sendParticipantEmail(
    participantId: string,
    hackathonId: string,
    emailType: EmailType,
  ) {
    // Get participant and hackathon data from database
    const participant = await this.prisma.participant.findUnique({
      where: { id: participantId },
    });

    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!participant || !hackathon) {
      throw new Error('Participant or hackathon not found');
    }

    const participantName =
      `${participant.firstName || ''} ${participant.lastName || ''}`.trim() ||
      'Participant';

    // Format date for email
    const startDate = hackathon.startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Base properties for email
    const baseProps = {
      participantName,
      hackathonName: hackathon.name,
      startDate,
      location: hackathon.location || 'TBA',
      dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
      supportEmail:
        process.env.SUPPORT_EMAIL || 'hackathon-support@redbull.com',
    };

    // Choose email template based on type
    let emailTemplate;
    let subject = '';

    if (emailType === 'registration') {
      subject = `Registration Confirmed: ${hackathon.name}`;
      emailTemplate = React.createElement(
        HackathonRegistrationEmail,
        baseProps,
      );
    } else if (emailType === 'feedback-request') {
      subject = `We'd love your feedback on ${hackathon.name}`;
      emailTemplate = React.createElement(HackathonFeedbackRequestEmail, {
        ...baseProps,
        feedbackFormUrl: `${process.env.FRONTEND_URL}/feedback/${hackathon.urlSlug}/${participantId}`,
        feedbackDeadline: new Date(
          hackathon.endDate.getTime() + 7 * 24 * 60 * 60 * 1000,
        ).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
    } else {
      throw new Error(`Unsupported email type: ${emailType}`);
    }

    // Send the email
    return this.sendMail({
      email: participant.email,
      subject,
      template: emailTemplate,
    });
  }

  private generateEmail = (template) => {
    return render(template);
  };

  async sendMail({ email, subject, template }: SendMailConfiguration) {
    const html = this.generateEmail(template);

    const { data, error } = await this.resend.emails.send({
      from: 'Jordan at LotosCRM <onboarding@resend.dev>',
      to: [email],
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  }
}
