import { getHackathonFeedbackAnalysis } from "@/actions/getHackathonFeedbackAnalysis";
import type { FeedbackAnalysis } from "@/actions/getHackathonFeedbackAnalysis";
import { Suspense } from "react";

interface FeedbackAnalysisProps {
  hackathonId: string;
}

async function FeedbackAnalysisContent({ hackathonId }: FeedbackAnalysisProps) {
  const response = await getHackathonFeedbackAnalysis(hackathonId);

  if (response.error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
        <p>Error: {response.error}</p>
      </div>
    );
  }

  const {
    overview,
    top_improvement_themes,
    key_quotes,
    email_subjects,
    survey_question_suggestions,
    recommendations,
    story_highlight,
  } = response.data as FeedbackAnalysis;

  // Feedback Overview & Insights Section
  const renderFeedbackOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Survey Response Breakdown - keeping this card untouched */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Survey Response Breakdown
        </h3>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600">Participants</div>
              <div className="text-2xl font-bold text-gray-800">65</div>
            </div>
            <div className="text-purple-500 font-medium bg-purple-50 px-2 py-1 rounded-full text-sm">
              77%
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600">Sponsors</div>
              <div className="text-2xl font-bold text-gray-800">12</div>
            </div>
            <div className="text-purple-500 font-medium bg-purple-50 px-2 py-1 rounded-full text-sm">
              14%
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600">Judges</div>
              <div className="text-2xl font-bold text-gray-800">7</div>
            </div>
            <div className="text-purple-500 font-medium bg-purple-50 px-2 py-1 rounded-full text-sm">
              8%
            </div>
          </div>
        </div>
      </div>

      {/* Top Improvement Themes */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Top Improvement Themes
          </h3>
        </div>

        <ul className="space-y-3">
          {top_improvement_themes.map((theme, index) => (
            <li
              key={index}
              className="pl-4 border-l-2 border-purple-300 text-gray-700"
            >
              {theme}
            </li>
          ))}
        </ul>
      </div>

      {/* Key Quotes */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Key Quotes</h3>
        </div>

        <div className="space-y-4">
          {key_quotes.map((quote, index) => (
            <p
              key={index}
              className="text-gray-700 italic border-l-2 border-purple-300 pl-4 py-1"
            >
              "{quote}"
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  // Actionables Section
  const renderActionables = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Ready-to-Send Emails */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Ready-to-Send Emails
          </h3>
        </div>

        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="min-w-5 pt-0.5">
              <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-500 text-xs font-bold">S</span>
              </div>
            </div>
            <span className="text-gray-700">{email_subjects.students}</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="min-w-5 pt-0.5">
              <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-500 text-xs font-bold">P</span>
              </div>
            </div>
            <span className="text-gray-700">{email_subjects.sponsors}</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="min-w-5 pt-0.5">
              <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-500 text-xs font-bold">K</span>
              </div>
            </div>
            <span className="text-gray-700">{email_subjects.stakeholders}</span>
          </li>
        </ul>
      </div>

      {/* Survey Question Suggestions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Survey Question Suggestions
          </h3>
        </div>

        <ul className="space-y-4">
          {survey_question_suggestions.map((question, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="min-w-5 pt-0.5">
                <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-500 text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
              <span className="text-gray-700">{question}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Story Highlight & Recommendations Section
  const renderStoryAndRecommendations = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      {/* Story Highlight */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
              <path d="M15 3v6h6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Story Highlight
          </h3>
        </div>

        <div className="bg-purple-50 p-4 rounded-md italic text-gray-700 border-l-2 border-purple-300">
          {story_highlight}
        </div>
      </div>

      {/* Agent Recommendations */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Agent Recommendations
          </h3>
        </div>

        <ul className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="min-w-5 pt-0.5">
                <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-500 text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <span className="h-8 w-1 bg-purple-500 rounded-full"></span>
          Feedback Overview & Insights
        </h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
          <p className="text-gray-700">{overview}</p>
        </div>
        {renderFeedbackOverview()}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <span className="h-8 w-1 bg-purple-500 rounded-full"></span>
          Actionables
        </h2>
        {renderActionables()}
      </div>

      {renderStoryAndRecommendations()}
    </div>
  );
}

function FeedbackAnalysisLoading() {
  return (
    <div>
      <div className="mb-12">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-6"></div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Loading placeholders for three cards */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loading placeholders for two cards */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Loading placeholders for two cards */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeedbackAnalysis({ hackathonId }: FeedbackAnalysisProps) {
  return (
    <Suspense fallback={<FeedbackAnalysisLoading />}>
      <FeedbackAnalysisContent hackathonId={hackathonId} />
    </Suspense>
  );
}
