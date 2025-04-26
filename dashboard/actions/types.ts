// Types for Hackathon API responses
export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  major: string;
  year: string;
  createdAt: string;
  updatedAt: string;
}

export interface HackathonParticipant {
  id: string;
  hackathonId: string;
  participantId: string;
  createdAt: string;
  updatedAt: string;
  participant: Participant;
}

export interface Hackathon {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  urlSlug: string;
  createdAt: string;
  updatedAt: string;
  participants?: HackathonParticipant[];
  feedback?: Feedback[];
}

// Types for Feedback API responses
export interface Feedback {
  id: string;
  
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
  
  // Legacy fields
  rating?: number;
  comments?: string;
  suggestions?: string | null;
  
  // Relations and metadata
  participantId: string;
  hackathonId: string;
  createdAt: string;
  updatedAt: string;
  participant?: Participant;
  hackathon?: Hackathon;
}

// Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
} 