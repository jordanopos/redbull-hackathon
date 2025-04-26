import { Suspense } from 'react';
import { getHackathonParticipants } from '@/actions/getHackathonParticipants';
import { ParticipantsTable } from '@/components/participants-table';
import { columns } from '@/components/participant-columns';

// Hardcoded hackathon ID for initial implementation
// In a real app, this could come from a dropdown selection or route parameter
const HACKATHON_ID = "975b7bc4-a3ef-45a5-98ad-e88ccc1a8900";

async function ParticipantsTableWrapper() {
  const response = await getHackathonParticipants(HACKATHON_ID);
  
  if (response.error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error: {response.error}</p>
      </div>
    );
  }
  
  return <ParticipantsTable columns={columns} data={response.data || []} />;
}

function LoadingParticipantsTable() {
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

export default function ParticipantsPage() {
  return (
    <main className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Participants</h1>
        <p className="text-gray-600">Manage hackathon participants</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <Suspense fallback={<LoadingParticipantsTable />}>
          <ParticipantsTableWrapper />
        </Suspense>
      </div>
    </main>
  );
} 