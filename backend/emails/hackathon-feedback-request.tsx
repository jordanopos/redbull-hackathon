import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface HackathonFeedbackRequestProps {
  participantName: string;
  hackathonName: string;
  feedbackFormUrl: string;
  feedbackDeadline: string;
  supportEmail: string;
}

export default function HackathonFeedbackRequest({
  participantName = 'Awesome Hacker',
  hackathonName = 'Redbull Hackathon 2023',
  feedbackFormUrl = 'https://hackathon.redbull.com/feedback',
  feedbackDeadline = 'December 15, 2023',
  supportEmail = 'hackathon-support@redbull.com',
}: HackathonFeedbackRequestProps) {
  return (
    <Html>
      <Head />
      <Preview>Your feedback on {hackathonName} is invaluable to us!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://i.ibb.co/XxpsvQLP/Black-White-Blue-Neon-Intro.png"
            width="108"
            height="78"
            alt="Redbull Logo"
            style={logo}
          />
          <Heading style={h1}>Your Feedback Matters!</Heading>

          <Section style={section}>
            <Text style={text}>Hi {participantName},</Text>
            <Text style={text}>
              Thank you for participating in <strong>{hackathonName}</strong>!
              We hope you had an amazing experience building, learning, and
              connecting with fellow innovators.
            </Text>

            <Text style={text}>
              Your insights are incredibly valuable to us as we strive to make
              our hackathons even better. Please take a few minutes to share
              your thoughts and experiences by completing our feedback survey.
            </Text>

            <Button style={button} href={feedbackFormUrl}>
              Share Your Feedback
            </Button>

            <Text style={noteText}>
              The survey should take less than 5 minutes to complete and your
              responses will remain anonymous.
            </Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Why Your Feedback Matters
            </Heading>
            <Text style={text}>
              <ul style={list}>
                <li>Help us improve future hackathons</li>
                <li>Share what worked well and what didn't</li>
                <li>Influence the themes and structure of our next event</li>
                <li>Ensure we're providing the best possible experience</li>
              </ul>
            </Text>
            <Text style={highlightText}>
              Please submit your feedback by <strong>{feedbackDeadline}</strong>
              .
            </Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Stay Connected
            </Heading>
            <Text style={text}>
              Don't forget to connect with us on social media to stay updated on
              future hackathons, tech events, and innovation opportunities.
            </Text>
            <Text style={socialLinks}>
              <Link href="https://twitter.com/redbull" style={link}>
                Twitter
              </Link>{' '}
              •
              <Link href="https://www.instagram.com/redbull/" style={link}>
                {' '}
                Instagram
              </Link>{' '}
              •
              <Link
                href="https://www.linkedin.com/company/red-bull/"
                style={link}
              >
                {' '}
                LinkedIn
              </Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            &copy; {new Date().getFullYear()} Redbull Hackathon Team. All rights
            reserved.
            <br />
            If you have any questions, please contact us at{' '}
            <Link href={`mailto:${supportEmail}`} style={link}>
              {supportEmail}
            </Link>
            .
            <br />
            <br />
            This email was sent to you because you participated in{' '}
            {hackathonName}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const logo = {
  margin: '0 auto 24px',
  display: 'block',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '30px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '500',
  margin: '24px 0 16px',
  padding: '0',
};

const section = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  marginBottom: '16px',
  padding: '24px',
};

const text = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const noteText = {
  ...text,
  fontSize: '14px',
  color: '#718096',
  fontStyle: 'italic',
  textAlign: 'center' as const,
  margin: '12px 0',
};

const highlightText = {
  ...text,
  backgroundColor: '#FEEBC8',
  padding: '12px',
  borderRadius: '4px',
  borderLeft: '3px solid #ED8936',
};

const button = {
  backgroundColor: '#ffbd00',
  borderRadius: '4px',
  color: '#000',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 20px',
  margin: '28px auto',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '240px',
};

const list = {
  padding: '0 0 0 24px',
  margin: '16px 0',
  lineHeight: '150%',
};

const socialLinks = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const link = {
  color: '#ffbd00',
  textDecoration: 'underline',
  margin: '0 4px',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  marginTop: '12px',
  textAlign: 'center' as const,
};
