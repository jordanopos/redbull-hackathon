import { Suspense } from 'react';
import { getHackathonStats } from '@/actions/getHackathonStats';

interface EventSnapshotProps {
  hackathonId: string;
}

async function EventSnapshotContent({ hackathonId }: EventSnapshotProps) {
  const response = await getHackathonStats(hackathonId);
  
  if (response.error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
        <p>Error: {response.error}</p>
      </div>
    );
  }
  
  const { totalSignups, totalFeedback, completionRate } = response.data;
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-6">Event Progress</h3>
      
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Signups</div>
            <div className="text-2xl font-bold">{totalSignups}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-600">Attended Launch</div>
            <div className="text-2xl font-bold">132</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-square"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-2xl font-bold">{totalFeedback}</div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <span>Completion Rate</span>
          <span className="font-medium">{completionRate}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full">
          <div className="h-2 bg-blue-900 rounded-full" style={{ width: `${completionRate}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function EventSnapshotLoading() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-6"></div>
      
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
            <div className="h-7 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
            <div className="h-7 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
            <div className="h-7 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full">
          <div className="h-2 bg-gray-200 animate-pulse rounded-full w-3/5"></div>
        </div>
      </div>
    </div>
  );
}

export function EventSnapshot({ hackathonId }: EventSnapshotProps) {
  return (
    <Suspense fallback={<EventSnapshotLoading />}>
      <EventSnapshotContent hackathonId={hackathonId} />
    </Suspense>
  );
} 