'use server';

import { Participant, ApiResponse, HackathonParticipant } from './types';

/**
 * Creates a new participant and adds them to a specified hackathon
 * @param participantData The participant data to create
 * @param hackathonId The ID of the hackathon to add the participant to
 * @returns An object containing either the created hackathon participant data or an error message
 */
export async function createParticipant(
  participantData: {
    firstName: string;
    lastName: string;
    email: string;
    school: string;
    major: string;
    year: string;
  },
  hackathonId: string
): Promise<ApiResponse<HackathonParticipant>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    // Call the backend API to create the participant and add them to the hackathon
    const response = await fetch(`${apiUrl}/hackathon/${hackathonId}/create-participant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(participantData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || 'Failed to create participant and add to hackathon'
      };
    }

    const hackathonParticipant = await response.json();
    return { data: hackathonParticipant };
  } catch (error) {
    console.error('Error creating participant:', error);
    return {
      error: `An unexpected error occurred while creating participant: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
} 