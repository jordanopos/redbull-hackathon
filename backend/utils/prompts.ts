/**
 * Collection of prompts used for AI operations
 */

export const PROMPTS = {
  /**
   * Prompt for analyzing hackathon feedback and generating insights
   */
  ANALYZE_FEEDBACK: `You are analyzing participant feedback from a hackathon with id {hackathonId}.
Your goal is to return insights in the following JSON format:

{
  "overview": "A concise summary of the overall feedback (2-4 sentences).",
  "top_improvement_themes": [
    "Theme 1",
    "Theme 2",
    "Theme 3"
  ],
  "key_quotes": [
    "Quote 1",
    "Quote 2",
    "Quote 3"
  ]
}

Instructions:

The overview should capture the general tone and main ideas from the feedback.

The improvement themes should be the most common or important suggestions for improvement, phrased clearly and concisely.

Key quotes should be direct excerpts from the feedback that are particularly insightful, illustrative, or representative.

Only include relevant and high-quality insights.

Do not add any commentary outside the JSON.`,
};

/**
 * Replace placeholder values in a prompt template
 *
 * @param promptTemplate The template string with placeholders
 * @param values Object containing values to replace placeholders
 * @returns Formatted prompt with placeholders replaced by actual values
 */
export function formatPrompt(
  promptTemplate: string,
  values: Record<string, string>,
): string {
  let formattedPrompt = promptTemplate;

  for (const [key, value] of Object.entries(values)) {
    formattedPrompt = formattedPrompt.replace(`{${key}}`, value);
  }

  return formattedPrompt;
}
