import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplicates
  await prisma.feedback.deleteMany({});
  await prisma.hackathonParticipant.deleteMany({});
  await prisma.participant.deleteMany({});
  
  // Create a hackathon if it doesn't exist
  const hackathon = await prisma.hackathon.upsert({
    where: { urlSlug: 'redbull-2023' },
    update: {},
    create: {
      name: 'Red Bull Hackathon 2023',
      description: 'Innovate with energy drinks and technology',
      startDate: new Date('2023-10-15'),
      endDate: new Date('2023-10-17'),
      location: 'Virtual',
      urlSlug: 'redbull-2023',
    },
  });

  console.log(`Created/found hackathon: ${hackathon.name}`);

  // Create participants
  const participants = await Promise.all(
    [
      {
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.j@example.com',
        school: 'UW Madison',
        major: 'Computer Science',
        year: 'Senior',
      },
      {
        firstName: 'Jamie',
        lastName: 'Smith',
        email: 'jamie.smith@example.com',
        school: 'UW Milwaukee',
        major: 'Information Systems',
        year: 'Junior',
      },
      {
        firstName: 'Taylor',
        lastName: 'Wilson',
        email: 'taylor.w@example.com',
        school: 'Marquette University',
        major: 'Software Engineering',
        year: 'Sophomore',
      },
      {
        firstName: 'Morgan',
        lastName: 'Davis',
        email: 'morgan.d@example.com',
        school: 'MSOE',
        major: 'Data Science',
        year: 'Freshman',
      },
      {
        firstName: 'Jordan',
        lastName: 'Brown',
        email: 'jordan.b@example.com',
        school: 'UW Madison',
        major: 'Computer Engineering',
        year: 'Graduate',
      },
      {
        firstName: 'Casey',
        lastName: 'Miller',
        email: 'casey.m@example.com',
        school: 'UW Milwaukee',
        major: 'Information Technology',
        year: 'Senior',
      },
      {
        firstName: 'Riley',
        lastName: 'Thompson',
        email: 'riley.t@example.com',
        school: 'Marquette University',
        major: 'Cybersecurity',
        year: 'Junior',
      },
      {
        firstName: 'Avery',
        lastName: 'Garcia',
        email: 'avery.g@example.com',
        school: 'MSOE',
        major: 'Computer Science',
        year: 'Sophomore',
      },
      {
        firstName: 'Quinn',
        lastName: 'Martinez',
        email: 'quinn.m@example.com',
        school: 'UW Madison',
        major: 'Artificial Intelligence',
        year: 'Graduate',
      },
      {
        firstName: 'Dakota',
        lastName: 'Lee',
        email: 'dakota.l@example.com',
        school: 'UW Milwaukee',
        major: 'Web Development',
        year: 'Senior',
      },
    ].map(async (participant) => {
      return prisma.participant.create({
        data: participant,
      });
    })
  );

  console.log(`Created ${participants.length} participants`);

  // Connect participants to hackathon
  for (const participant of participants) {
    await prisma.hackathonParticipant.create({
      data: {
        hackathonId: hackathon.id,
        participantId: participant.id,
      },
    });
  }

  console.log(`Connected all participants to hackathon`);

  // Feedback options for diversity
  const satisfactionOptions = ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied'];
  const participationOptions = ['Yes', 'No', 'Maybe'];
  const difficultyOptions = ['Too easy', 'Easy', 'Just right', 'Difficult', 'Too difficult'];
  const learningOptions = [
    'Yes I learned a lot', 
    'Somewhat I learned a few things', 
    'Neutral', 
    'Not really I didn\'t learn much', 
    'No I didn\'t learn anything new'
  ];
  const qualityOptions = ['Excellent', 'Good', 'Neutral', 'Poor', 'Very poor'];
  const resourceOptions = [
    'Yes everything was provided', 
    'Mostly but some things were missing', 
    'Neutral', 
    'No I needed more resources', 
    'No it was difficult to access what I needed'
  ];
  const clarityOptions = [
    'Very clear and understandable', 
    'Somewhat clear and understandable', 
    'Neutral', 
    'Somewhat unclear and not understandable', 
    'Very unclear and not understandable'
  ];
  const fairnessOptions = ['Very fair', 'Somewhat fair', 'Neutral', 'Somewhat unfair', 'Very unfair'];
  const structureOptions = [
    'Very well-structured', 
    'Somewhat well-structured', 
    'Neutral', 
    'Somewhat disorganized', 
    'Very disorganized'
  ];

  // Helper function to get random element from array
  const getRandomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];
  
  // Helper function to generate balanced feedback (mix of good, medium, poor)
  const generateFeedback = (index: number) => {
    // Make first 4 mostly positive, middle 3 mixed, last 3 more critical
    if (index < 4) {
      return {
        overallSatisfaction: getRandomElement(['Very satisfied', 'Satisfied']),
        futureParticipation: getRandomElement(['Yes', 'Maybe']),
        challengeDifficulty: getRandomElement(['Just right', 'Easy']),
        learningExperience: getRandomElement(['Yes I learned a lot', 'Somewhat I learned a few things']),
        mentorSupport: getRandomElement(['Excellent', 'Good']),
        staffSupport: getRandomElement(['Excellent', 'Good']),
        resourceAccess: getRandomElement(['Yes everything was provided', 'Mostly but some things were missing']),
        rubricClarity: getRandomElement(['Very clear and understandable', 'Somewhat clear and understandable']),
        judgingFairness: getRandomElement(['Very fair', 'Somewhat fair']),
        instructionClarity: getRandomElement(['Very clear', 'Somewhat clear']),
        scheduleStructure: getRandomElement(['Very well-structured', 'Somewhat well-structured']),
        rating: Math.floor(Math.random() * 2) + 4, // 4-5
      };
    } else if (index < 7) {
      return {
        overallSatisfaction: getRandomElement(['Satisfied', 'Neutral']),
        futureParticipation: getRandomElement(['Yes', 'Maybe', 'No']),
        challengeDifficulty: getRandomElement(['Just right', 'Difficult']),
        learningExperience: getRandomElement(['Somewhat I learned a few things', 'Neutral']),
        mentorSupport: getRandomElement(['Good', 'Neutral']),
        staffSupport: getRandomElement(['Good', 'Neutral']),
        resourceAccess: getRandomElement(['Mostly but some things were missing', 'Neutral']),
        rubricClarity: getRandomElement(['Somewhat clear and understandable', 'Neutral']),
        judgingFairness: getRandomElement(['Somewhat fair', 'Neutral']),
        instructionClarity: getRandomElement(['Somewhat clear', 'Neutral']),
        scheduleStructure: getRandomElement(['Somewhat well-structured', 'Neutral']),
        rating: Math.floor(Math.random() * 2) + 3, // 3-4
      };
    } else {
      return {
        overallSatisfaction: getRandomElement(['Neutral', 'Dissatisfied', 'Very dissatisfied']),
        futureParticipation: getRandomElement(['Maybe', 'No']),
        challengeDifficulty: getRandomElement(['Difficult', 'Too difficult']),
        learningExperience: getRandomElement(['Neutral', 'Not really I didn\'t learn much']),
        mentorSupport: getRandomElement(['Neutral', 'Poor']),
        staffSupport: getRandomElement(['Neutral', 'Poor']),
        resourceAccess: getRandomElement(['Neutral', 'No I needed more resources']),
        rubricClarity: getRandomElement(['Neutral', 'Somewhat unclear and not understandable']),
        judgingFairness: getRandomElement(['Neutral', 'Somewhat unfair']),
        instructionClarity: getRandomElement(['Neutral', 'Somewhat unclear']),
        scheduleStructure: getRandomElement(['Neutral', 'Somewhat disorganized']),
        rating: Math.floor(Math.random() * 2) + 1, // 1-2
      };
    }
  };

  // Open-ended feedback templates
  const favoritePartOptions = [
    'The networking opportunities with industry professionals',
    'The challenging problem statements',
    'Collaborating with talented teammates',
    'Learning new technologies and frameworks',
    'The mentorship and guidance provided',
    'The food and refreshments',
    'The workshops and learning sessions',
    'The prizes and recognition',
    'The friendly competition atmosphere',
    'Building something meaningful in a short time',
  ];

  const suggestedImprovements = [
    'More time for project development',
    'Better Wi-Fi connectivity',
    'More diverse food options',
    'More technical workshops before the hackathon',
    'Clearer judging criteria',
    'More mentors with specific expertise',
    'Better organization of the opening ceremony',
    'More breaks scheduled throughout the event',
    'More programming resources and templates',
    'Improved communication about schedule changes',
  ];

  const additionalComments = [
    'Overall a great experience!',
    'Looking forward to the next event',
    'Thank you for organizing this hackathon',
    'I learned a lot and made great connections',
    'I wish there was more industry representation',
    'The venue was a bit cramped for comfort',
    'The presentations ran too long at the end',
    'Would recommend to other students',
    'Needed more power outlets for laptops',
    'The platform used for submissions was confusing',
  ];

  // Create feedback for each participant
  for (let i = 0; i < participants.length; i++) {
    const feedbackBase = generateFeedback(i);
    
    await prisma.feedback.create({
      data: {
        ...feedbackBase,
        favoritePart: getRandomElement(favoritePartOptions),
        suggestedImprovements: getRandomElement(suggestedImprovements),
        additionalComments: getRandomElement(additionalComments),
        comments: `This is sample comment ${i + 1} from a participant`,
        suggestions: `This is sample suggestion ${i + 1} from a participant`,
        participantId: participants[i].id,
        hackathonId: hackathon.id,
      },
    });
  }

  console.log(`Created 10 feedback entries`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 