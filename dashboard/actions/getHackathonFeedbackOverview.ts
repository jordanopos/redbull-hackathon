import { ApiResponse } from "./types";

/**
 * Interface for the feedback overview response
 */
export interface FeedbackOverview {
  overview: string;
  top_improvement_themes: string[];
  key_quotes: string[];
}

/**
 * Fetches a summarized overview of feedback for a specific hackathon
 * @param hackathonId The ID of the hackathon
 * @returns An object containing either the feedback overview or an error message
 */
export async function getHackathonFeedbackOverview(
  hackathonId: string
): Promise<ApiResponse<FeedbackOverview>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Call the backend API to fetch the hackathon feedback overview
    const response = await fetch(
      `${apiUrl}/azure/feedback-overview?hackathonId=${hackathonId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Cache for 15 minutes, but revalidate if a new request comes in
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
          `Failed to fetch feedback overview for hackathon ID: ${hackathonId}`,
      };
    }

    const feedbackOverview = await response.json();
    return { data: feedbackOverview };
  } catch (error) {
    console.error("Error fetching hackathon feedback overview:", error);
    return {
      error: `An unexpected error occurred while fetching the feedback overview: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
} 