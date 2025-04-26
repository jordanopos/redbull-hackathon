export class CreateFeedbackDto {
  // General Experience
  overallSatisfaction?: string;
  futureParticipation?: string;

  // Topic & Challenge
  challengeDifficulty?: string;
  learningExperience?: string;

  // Support & Resources
  mentorSupport?: string;
  staffSupport?: string;
  resourceAccess?: string;
  rubricClarity?: string;
  judgingFairness?: string;

  // Organization & Clarity
  instructionClarity?: string;
  scheduleStructure?: string;

  // Open-ended Feedback
  favoritePart?: string;
  suggestedImprovements?: string;
  additionalComments?: string;

  // Legacy fields maintained for compatibility
  rating?: number;
  comments?: string;
  suggestions?: string;

  // Relations
  email: string;
  hackathonId: string;
}
