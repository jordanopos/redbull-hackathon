import { Suspense } from 'react';
import { getHackathonFeedback } from '@/actions/getHackathonFeedback';
import { FeedbackTable } from '@/components/feedback-table';
import { columns } from '@/components/feedback-columns';
import { FeedbackOverview } from '@/components/feedback-overview';

// Hardcoded hackathon ID for initial implementation
// In a real app, this could come from a dropdown selection or route parameter
const HACKATHON_ID = "975b7bc4-a3ef-45a5-98ad-e88ccc1a8900";

async function FeedbackTableWrapper() {
  const response = await getHackathonFeedback(HACKATHON_ID);
  
  if (response.error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error: {response.error}</p>
      </div>
    );
  }
  
  return <FeedbackTable columns={columns} data={response.data || []} />;
}

function LoadingFeedbackTable() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-48 bg-gray-200 animate-pulse rounded"></div>
      <div className="border rounded-md">
        <div className="h-12 border-b bg-gray-50"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 border-b last:border-0 flex items-center">
            <div className="h-6 w-full mx-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <main className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Feedback</h1>
        <p className="text-gray-600">View and analyze hackathon feedback</p>
      </div>
      
      <div className="space-y-8">
        {/* Feedback Overview Component */}
        <FeedbackOverview hackathonId={HACKATHON_ID} />
        
        {/* Existing Feedback Table */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Suspense fallback={<LoadingFeedbackTable />}>
            <FeedbackTableWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
