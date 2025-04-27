import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface HackathonEventOverviewProps {
  participantName: string;
  hackathonName: string;
  eventDate: string;
  participantCount: number;
  projectCount: number;
  winnerName: string;
  winnerProject: string;
  keyInsights: string[];
  highlightStory: string;
  photosUrl: string;
  nextEventDate: string;
  nextEventTheme: string;
  dashboardUrl: string;
  supportEmail: string;
}

export default function HackathonEventOverview({
  participantName = 'Awesome Hacker',
  hackathonName = 'Redbull Hackathon 2023',
  eventDate = 'November 15-17, 2023',
  participantCount = 156,
  projectCount = 32,
  winnerName = 'Team Innovators',
  winnerProject = 'Sustainable Energy Tracker',
  keyInsights = [
    'Participants valued the networking opportunities',
    'Technical workshops were highly rated',
    'More mentorship sessions requested for future events',
  ],
  highlightStory = 'Two teams spontaneously merged during the event to combine their complementary skills, creating an unexpected but powerful collaboration that impressed our judges!',
  photosUrl = 'https://hackathon.redbull.com/photos',
  nextEventDate = 'Spring 2024',
  nextEventTheme = 'AI for Social Good',
  dashboardUrl = 'https://hackathon.redbull.com/dashboard',
  supportEmail = 'hackathon-support@redbull.com',
}: HackathonEventOverviewProps) {
  return (
    <Html>
      <Head />
      <Preview>{hackathonName} Wrap-Up: Celebrating Innovation & Success!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.redbull.com/favicon.ico"
            width="48"
            height="48"
            alt="Redbull Logo"
            style={logo}
          />
          <Heading style={h1}>{hackathonName} Wrap-Up</Heading>
          
          {/* Hero Section */}
          <Section style={heroSection}>
            <Text style={heroText}>
              Thank you for being part of an incredible journey!
            </Text>
          </Section>

          {/* Personal Greeting */}
          <Section style={section}>
            <Text style={text}>
              Hi {participantName},
            </Text>
            <Text style={text}>
              What an incredible event! The {hackathonName} has come to a close, but the innovations, connections, and memories will last much longer. We wanted to share some highlights and insights gathered from participants like you.
            </Text>
          </Section>

          {/* Event Stats */}
          <Section style={statSection}>
            <Row>
              <Column style={statColumn}>
                <Text style={statNumber}>{participantCount}</Text>
                <Text style={statLabel}>Participants</Text>
              </Column>
              <Column style={statColumn}>
                <Text style={statNumber}>{projectCount}</Text>
                <Text style={statLabel}>Projects</Text>
              </Column>
              <Column style={statColumn}>
                <Text style={statNumber}>3</Text>
                <Text style={statLabel}>Days</Text>
              </Column>
            </Row>
          </Section>

          {/* Winner Announcement */}
          <Section style={winnerSection}>
            <Heading as="h2" style={h2}>🏆 Winner Announcement</Heading>
            <Text style={text}>
              Congratulations to <strong>{winnerName}</strong> for their outstanding project: <strong>{winnerProject}</strong>!
            </Text>
            <Text style={text}>
              Their innovative solution stood out for its technical excellence, practical implementation, and potential impact.
            </Text>

            <Button style={photoButton} href={photosUrl}>
              View Event Photos
            </Button>
          </Section>

          {/* Feedback Insights */}
          <Section style={section}>
            <Heading as="h2" style={h2}>What You Told Us</Heading>
            <Text style={text}>
              We've analyzed all the feedback and wanted to share some key insights:
            </Text>
            <ul style={list}>
              {keyInsights.map((insight, index) => (
                <li key={index} style={listItem}>{insight}</li>
              ))}
            </ul>
          </Section>

          {/* Highlight Story */}
          <Section style={storySection}>
            <Heading as="h2" style={h2}>Highlight Story</Heading>
            <Text style={storyText}>
              {highlightStory}
            </Text>
          </Section>

          {/* Looking Forward */}
          <Section style={section}>
            <Heading as="h2" style={h2}>Looking Forward</Heading>
            <Text style={text}>
              Based on your feedback, we're already planning our next hackathon! Mark your calendars for <strong>{nextEventDate}</strong> when we'll explore <strong>{nextEventTheme}</strong>.
            </Text>
            <Text style={text}>
              Stay tuned to your dashboard for early registration opportunities and exclusive content.
            </Text>

            <Button style={button} href={dashboardUrl}>
              Visit Your Dashboard
            </Button>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            &copy; {new Date().getFullYear()} Redbull Hackathon Team. All rights reserved.
            <br />
            If you have any questions, please contact us at{' '}
            <Link href={`mailto:${supportEmail}`} style={link}>
              {supportEmail}
            </Link>.
            <br />
            <br />
            This email was sent to you because you participated in {hackathonName}.
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
  maxWidth: '600px',
};

const logo = {
  margin: '0 auto 24px',
  display: 'block',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '600',
  margin: '24px 0 16px',
  padding: '0',
};

const heroSection = {
  backgroundColor: '#cf102d',
  borderRadius: '6px',
  padding: '40px 24px',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const heroText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0',
};

const section = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  marginBottom: '24px',
  padding: '24px',
};

const statSection = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  marginBottom: '24px',
  padding: '24px',
  textAlign: 'center' as const,
};

const statColumn = {
  display: 'inline-block',
  width: '33%',
  textAlign: 'center' as const,
  padding: '10px 0',
};

const statNumber = {
  color: '#cf102d',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1',
};

const statLabel = {
  color: '#4a5568',
  fontSize: '14px',
  margin: '8px 0 0',
};

const winnerSection = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  marginBottom: '24px',
  padding: '24px',
  borderTop: '3px solid #cf102d',
};

const storySection = {
  backgroundColor: '#F7FAFC',
  borderRadius: '6px',
  marginBottom: '24px',
  padding: '24px',
  borderLeft: '3px solid #cf102d',
};

const text = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const storyText = {
  ...text,
  fontStyle: 'italic',
  color: '#4a5568',
};

const button = {
  backgroundColor: '#cf102d',
  borderRadius: '4px',
  color: '#fff',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 20px',
  margin: '28px auto',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '260px',
};

const photoButton = {
  ...button,
  backgroundColor: '#3182ce',
};

const list = {
  padding: '0 0 0 24px',
  margin: '16px 0',
  lineHeight: '150%',
};

const listItem = {
  margin: '8px 0',
};

const link = {
  color: '#cf102d',
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