'use server';

import { CreateFeedbackRequest, Feedback, ApiResponse } from './types';

/**
 * Submits participant feedback for a hackathon
 * @param feedbackData The feedback data to submit
 * @returns An object containing either the created feedback data or an error message
 */
export async function submitFeedback(
  feedbackData: CreateFeedbackRequest
): Promise<ApiResponse<Feedback>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    // Call the backend API to submit the feedback
    const response = await fetch(`${apiUrl}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || 'Failed to submit feedback'
      };
    }

    const createdFeedback = await response.json();
    return { data: createdFeedback };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return {
      error: `An unexpected error occurred while submitting feedback: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
} 