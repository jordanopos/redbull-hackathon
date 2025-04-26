import { ApiResponse, Feedback } from "./types";

/**
 * Fetches all feedback for a specific hackathon by its ID
 * @param hackathonId The ID of the hackathon
 * @returns An object containing either the array of feedback or an error message
 */
export async function getHackathonFeedback(
  hackathonId: string
): Promise<ApiResponse<Feedback[]>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Call the backend API to fetch the hackathon feedback
    const response = await fetch(
      `${apiUrl}/feedback/hackathon/${hackathonId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Cache for 5 minutes, but revalidate if a new request comes in
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error:
          errorData.message ||
          `Failed to fetch feedback for hackathon ID: ${hackathonId}`,
      };
    }

    const feedback = await response.json();
    return { data: feedback };
  } catch (error) {
    console.error("Error fetching hackathon feedback:", error);
    return {
      error: `An unexpected error occurred while fetching the feedback: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
} 