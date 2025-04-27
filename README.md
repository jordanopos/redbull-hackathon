# Hackathon Feedback Intelligence System

## Description of the System

This system streamlines the feedback gathering and analysis process for organizations running hackathons. The system continuously updates in real time as new participant feedback is added, ensuring organizers have immediate access to actionable data without manual intervention. It leverages AI-powered agents, a real-time user interface, and backend automation to deliver actionable insights for process and systems improvement. Key features include tracking signup-to-feedback completion rates, generating improvement themes and key quotes, AI-generated communications (emails, social posts, survey suggestions), and providing agent-driven operational recommendations.

### Key functionalities include:

- Tracking signup-to-feedback completion rates
- Displaying top improvement themes and key quotes
- Generating ready-to-send participant emails based on feedback
- Suggesting new survey questions
- Creating ready-to-post LinkedIn stories based on real participant experiences
- Agent recommendations for event improvements
- Automating feedback reminder emails to boost response rates

## Roles of Each Agent

### Analysis Agent

Processes incoming participant feedback, extracting key themes, trends, improvement suggestions, and memorable quotes. Provides a structured understanding of participant experiences.

### Visualization Agent

Takes outputs from the Analysis Agent and generates user-friendly visual summaries and dashboards. Presents insights like signup-to-feedback completion rates, top improvement areas, and participant sentiment in a clear, actionable format.

### Voice & Style Content Agent

Creates communications (emails, stories, announcements) written in the hackathon organizer’s unique voice, tone, and style. Supports AI-assisted editing to tailor the generated content as needed for different audiences or platforms.

## Technologies Used

- Frontend: Node.js, Shadcn/UI for component styling
- Backend: Nest.js with TypeScript
- AI Agent Platform: Azure AI Foundry (hosting all three agents)
- Database: PostgreSQL (storing feedback, analysis results, user interactions)
- Testing/Prototyping Tools: Postman for API testing
- Deployment: Azure Web Services

# How to Redeploy

## RedBull Hackathon Feedback System

This project consists of three main components:
1. **Backend API** - NestJS server with PostgreSQL database
2. **Dashboard** - Next.js admin dashboard to view and manage hackathon data
3. **Feedback App** - Next.js public-facing feedback collection app

## System Requirements

- Node.js v20 or higher
- PostgreSQL database
- Docker (optional, for containerized deployment)

## Environment Setup

### Backend Environment Variables (.env)

Create a `.env` file in the `backend` directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/redbull_hackathon"

# Email (if using email notifications)
RESEND_API_KEY=your_resend_api_key

# Optional: Azure services integration
AZURE_KEY=your_azure_key
AZURE_ENDPOINT=your_azure_endpoint

# Server port
PORT=3001
```

### Dashboard Environment Variables (.env.local)

Create a `.env.local` file in the `dashboard` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Feedback App Environment Variables (.env.local)

Create a `.env.local` file in the `feedback` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Installation & Development Setup

### Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run seed  # Optional: Seed the database with initial data
npm run start:dev
```

The backend will run on http://localhost:3001 by default.

### Dashboard Setup

```bash
cd dashboard
npm install
npm run dev
```

The dashboard will run on http://localhost:3000 by default.

### Feedback App Setup

```bash
cd feedback
npm install
npm run dev
```

The feedback app will run on a different port, typically http://localhost:3002.

## Production Deployment

### Backend Deployment

#### Using Docker

```bash
cd backend
docker build -t redbull-backend .
docker run -p 3001:3001 --env-file .env redbull-backend
```

#### Manual Deployment

```bash
cd backend
npm install
npm run build
npx prisma migrate deploy
npm run start:prod
```

### Dashboard Deployment

```bash
cd dashboard
npm install
npm run build
npm run start
```

For production deployment, consider using a service like Vercel, Netlify, or a custom server with proper environment configuration.

### Feedback App Deployment

```bash
cd feedback
npm install
npm run build
npm run start
```

Similar to the dashboard, this can be deployed on a service like Vercel, Netlify, or a custom server.

## Database Management

The system uses Prisma ORM with PostgreSQL. Key database commands:

```bash
# Generate Prisma client
npx prisma generate

# Create migrations from schema changes
npx prisma migrate dev

# Apply migrations to database
npx prisma migrate deploy

# Seed database with initial data
npm run seed

# View database using Prisma Studio
npx prisma studio
```

## System Architecture

- **Backend**: NestJS API server with Prisma ORM, handling data storage, email services, and business logic
- **Dashboard**: Next.js admin interface for managing hackathons, participants, and viewing feedback data
- **Feedback App**: Public-facing Next.js application for collecting participant feedback

## Key Features

- Hackathon management
- Participant registration
- Feedback collection with various question types
- Dashboard with analytics
- Email notifications

## Timezone Configuration

The system is configured to use the "Africa/Kampala" timezone for the backend.

## Troubleshooting

- If database connection fails, verify your DATABASE_URL in the .env file
- For CORS issues, ensure the backend allows cross-origin requests from your frontend domains
- Check port availability if services fail to start 