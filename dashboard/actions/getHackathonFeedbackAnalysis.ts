import { ApiResponse } from "./types";

/**
 * Interface for the extended feedback analysis response
 */
export interface FeedbackAnalysis {
  overview: string;
  top_improvement_themes: string[];
  key_quotes: string[];
  email_subjects: {
    sponsors: string;
    students: string;
    stakeholders: string;
  };
  survey_question_suggestions: string[];
  recommendations: string[];
  story_highlight: string;
}

/**
 * Fetches a comprehensive analysis of feedback for a specific hackathon
 * @param hackathonId The ID of the hackathon
 * @returns An object containing either the feedback analysis or an error message
 */
export async function getHackathonFeedbackAnalysis(
  hackathonId: string
): Promise<ApiResponse<FeedbackAnalysis>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Call the backend API to fetch the hackathon feedback analysis
    const response = await fetch(
      `${apiUrl}/azure/analysis?hackathonId=${hackathonId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
        next: {
          revalidate: 900,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error:
          errorData.message ||
          `Failed to fetch feedback analysis for hackathon ID: ${hackathonId}`,
      };
    }

    const feedbackAnalysis = await response.json();
    return { data: feedbackAnalysis };
  } catch (error) {
    console.error("Error fetching hackathon feedback analysis:", error);
    return {
      error: `An unexpected error occurred while fetching the feedback analysis: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
