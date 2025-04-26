'use server';

import { Hackathon, ApiResponse } from './types';

/**
 * Fetches a hackathon by its URL slug
 * @param slug The URL slug of the hackathon
 * @returns An object containing either the hackathon data or an error message
 */
export async function getHackathonBySlug(
  slug: string
): Promise<ApiResponse<Hackathon>> {
  try {
    // Get the API URL from environment variables with a fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    // Call the backend API to fetch the hackathon
    const response = await fetch(`${apiUrl}/hackathon/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 1 hour, but revalidate if a new request comes in
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || `Failed to fetch hackathon with slug: ${slug}`
      };
    }

    const hackathon = await response.json();
    return { data: hackathon };
  } catch (error) {
    console.error('Error fetching hackathon by slug:', error);
    return {
      error: `An unexpected error occurred while fetching the hackathon: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
} 