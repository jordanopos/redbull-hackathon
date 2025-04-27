import { ApiResponse } from "./types";

/**
 * Interface for the hackathon stats response
 */
export interface HackathonStats {
  totalSignups: number;
  totalFeedback: number;
  completionRate: number;
}

/**
 * Fetches statistics for a specific hackathon by its ID
 * @param hackathonId The ID of the hackathon
 * @returns An object containing either the hackathon stats or an error message
 */
export async function getHackathonStats(
  hackathonId: string
): Promise<ApiResponse<HackathonStats>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Call the backend API to fetch the hackathon stats
    const response = await fetch(`${apiUrl}/hackathon/${hackathonId}/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 5 minutes, but revalidate if a new request comes in
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error:
          errorData.message ||
          `Failed to fetch stats for hackathon ID: ${hackathonId}`,
      };
    }

    const stats = await response.json();
    return { data: stats };
  } catch (error) {
    console.error("Error fetching hackathon stats:", error);
    return {
      error: `An unexpected error occurred while fetching the stats: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
