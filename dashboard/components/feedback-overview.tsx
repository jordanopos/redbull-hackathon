import { getHackathonFeedbackOverview } from '@/actions/getHackathonFeedbackOverview';
import type { FeedbackOverview } from '@/actions/getHackathonFeedbackOverview';
import { Suspense } from 'react';

interface FeedbackOverviewProps {
  hackathonId: string;
}

async function FeedbackOverviewContent({ hackathonId }: FeedbackOverviewProps) {
  const response = await getHackathonFeedbackOverview(hackathonId);
  
  if (response.error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
        <p>Error: {response.error}</p>
      </div>
    );
  }
  
  const { overview, top_improvement_themes, key_quotes } = response.data as FeedbackOverview;
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Overall Feedback</h3>
        <p className="text-gray-700">{overview}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-purple-500 mr-2">★</span>
            Top Improvement Themes
          </h3>
          <ul className="space-y-4">
            {top_improvement_themes.map((theme, index) => (
              <li key={index} className="text-gray-700">{theme}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-purple-500 mr-2">💬</span>
            Key Quotes
          </h3>
          <ul className="space-y-4">
            {key_quotes.map((quote, index) => (
              <li key={index} className="text-gray-700">"{quote}"</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeedbackOverviewLoading() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeedbackOverview({ hackathonId }: FeedbackOverviewProps) {
  return (
    <Suspense fallback={<FeedbackOverviewLoading />}>
      <FeedbackOverviewContent hackathonId={hackathonId} />
    </Suspense>
  );
} 