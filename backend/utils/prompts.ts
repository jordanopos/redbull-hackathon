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

  /**
   * Extended prompt for analyzing hackathon feedback with additional insights
   */
  ANALYZE_FEEDBACK_EXTENDED: `You are analyzing participant feedback from a hackathon with id {hackathonId}.
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
  ],
  "email_subjects": {
    "sponsors": "Subject line to send to sponsors",
    "students": "Subject line to send to students",
    "stakeholders": "Subject line to send to internal/external stakeholders"
  },
  "survey_question_suggestions": [
    "Survey question 1",
    "Survey question 2",
    "Survey question 3"
  ],
  "recommendations": [
    "Recommendation 1 to improve the hackathon",
    "Recommendation 2 to improve the hackathon",
    "Recommendation 3 to improve the hackathon"
  ],
  "story_highlight": "A short, engaging story that captures a highlight moment from the hackathon, based on the feedback."
}

Instructions:

Overview: Summarize the general sentiment and key feedback points.

Improvement Themes: Identify and clearly state the top 3 areas for improvement.

Key Quotes: Pick direct participant quotes that are powerful or representative.

Email Subjects: Create compelling subject lines for emails to (1) sponsors, (2) students, and (3) stakeholders.

Survey Questions: Suggest 3 new feedback questions we should ask next time, informed by the current feedback.

Recommendations: Suggest 3 actionable ways to improve the hackathon.

Story Highlight: Write a short highlight (about 3–5 sentences) that tells a memorable or meaningful story from the hackathon.

Output only the JSON object. No extra commentary or explanations.`,
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
