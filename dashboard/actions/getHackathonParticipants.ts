import { ApiResponse, Participant } from "./types";

/**
 * Fetches all participants for a specific hackathon by its ID
 * @param hackathonId The ID of the hackathon
 * @returns An object containing either the array of participants or an error message
 */
export async function getHackathonParticipants(
  hackathonId: string
): Promise<ApiResponse<Participant[]>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Call the backend API to fetch the hackathon participants
    const response = await fetch(
      `${apiUrl}/hackathon/${hackathonId}/participants`,
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
          `Failed to fetch participants for hackathon ID: ${hackathonId}`,
      };
    }

    const participants = await response.json();
    return { data: participants };
  } catch (error) {
    console.error("Error fetching hackathon participants:", error);
    return {
      error: `An unexpected error occurred while fetching the participants: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
