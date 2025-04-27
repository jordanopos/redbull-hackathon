import { Suspense } from 'react';
import { getHackathonStats, HackathonStats } from '@/actions/getHackathonStats';
import { Card, CardContent } from './ui/card';

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
  
  const { totalSignups, totalFeedback, completionRate } = response.data as HackathonStats;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Signups */}
      <Card className="border-l-4 border-l-black">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Signups</p>
              <h3 className="text-2xl font-bold">{totalSignups}</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Attended Launch */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Attended Launch</p>
              <h3 className="text-2xl font-bold">132</h3>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Completed */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Completed</p>
              <h3 className="text-2xl font-bold">{totalFeedback}</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <polyline points="9 11 12 14 22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Completion Rate */}
      <Card className="border-l-4 border-l-pink-500">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Completion Rate</p>
              <h3 className="text-2xl font-bold">{completionRate}%</h3>
            </div>
            <div className="bg-pink-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-1.5 bg-pink-500 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EventSnapshotLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="border-l-4 border-l-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-7 w-16 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
            {index === 3 && (
              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-2">
                <div className="h-1.5 bg-gray-200 animate-pulse rounded-full w-3/5"></div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
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