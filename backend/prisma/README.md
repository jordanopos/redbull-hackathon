# Prisma Seed Script

This directory contains a seed script to populate the database with dummy data for testing and development purposes.

## What the Seed Script Does

The seed script (`seed.ts`) performs the following:

1. Creates a sample hackathon if it doesn't exist
2. Creates 10 participants with different backgrounds
3. Links all participants to the hackathon
4. Creates feedback entries for each participant with varying levels of satisfaction

## How to Run the Seed Script

To populate your database with dummy data:

1. Make sure your database connection is configured in `.env`
2. Run the seed script:

```bash
# From the backend directory:
npm run seed
```

## Notes

- The script will clear existing feedback, hackathon-participant links, and participants before adding new data
- Hackathons will be upserted (created if they don't exist, or kept if they do)
- The seed data includes a mix of positive, neutral, and negative feedback

## Customizing

You can customize the seed data by modifying the arrays in the seed script:
- Participant information
- Feedback options
- Open-ended feedback templates 