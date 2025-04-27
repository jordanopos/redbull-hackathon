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

interface HackathonRegistrationEmailProps {
  participantName: string;
  hackathonName: string;
  startDate: string;
  location: string;
  dashboardUrl: string;
  supportEmail: string;
}

export default function HackathonRegistrationEmail({
  participantName = 'Awesome Hacker',
  hackathonName = 'Redbull Hackathon 2023',
  startDate = 'November 15, 2023',
  location = 'Innovation Hub, San Francisco',
  dashboardUrl = 'https://hackathon.redbull.com/dashboard',
  supportEmail = 'hackathon-support@redbull.com',
}: HackathonRegistrationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You're registered for {hackathonName}! Get ready to innovate.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.redbull.com/favicon.ico"
            width="48"
            height="48"
            alt="Redbull Logo"
            style={logo}
          />
          <Heading style={h1}>Registration Confirmed!</Heading>
          
          <Section style={section}>
            <Text style={text}>
              Hi {participantName},
            </Text>
            <Text style={text}>
              You're officially registered for <strong>{hackathonName}</strong>. We're excited to have you join us for this amazing event!
            </Text>

            <Text style={textBold}>Event Details:</Text>
            <Text style={details}>
              <strong>Date:</strong> {startDate}<br />
              <strong>Location:</strong> {location}
            </Text>

            <Text style={text}>
              Make sure to check the participant dashboard for important announcements, schedule updates, and to connect with other participants.
            </Text>

            <Button style={button} href={dashboardUrl}>
              Access Your Dashboard
            </Button>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>What's Next?</Heading>
            <Text style={text}>
              <ul style={list}>
                <li>Join our pre-event online briefing (details coming soon)</li>
                <li>Complete your profile in the participant dashboard</li>
                <li>Review the competition rules and theme</li>
                <li>Start forming your team (or join one)</li>
              </ul>
            </Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>Need Help?</Heading>
            <Text style={text}>
              If you have any questions or need assistance, please don't hesitate to reach out to our support team at{' '}
              <Link href={`mailto:${supportEmail}`} style={link}>
                {supportEmail}
              </Link>.
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            &copy; {new Date().getFullYear()} Redbull Hackathon Team. All rights reserved.
            <br />
            This email was sent to you because you registered for {hackathonName}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
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

const textBold = {
  ...text,
  fontWeight: 'bold',
};

const button = {
  backgroundColor: '#cf102d',
  borderRadius: '4px',
  color: '#fff',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 20px',
  margin: '24px auto',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '220px',
};

const list = {
  padding: '0 0 0 24px',
  margin: '16px 0',
  lineHeight: '150%',
};

const details = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#f8fafc',
  borderRadius: '4px',
};

const link = {
  color: '#cf102d',
  textDecoration: 'underline',
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