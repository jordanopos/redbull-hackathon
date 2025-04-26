import Image from "next/image";

export default function Home() {
  return (
    <main className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your Hackathon management hub</p>
      </div>

      {/* Event Snapshot Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Event Snapshot</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-6">Event Progress</h3>
          
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Signups</div>
                <div className="text-2xl font-bold">156</div>
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
                <div className="text-2xl font-bold">98</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span>Completion Rate</span>
              <span className="font-medium">63%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full">
              <div className="h-2 bg-blue-900 rounded-full" style={{ width: '63%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Overview Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Feedback Overview & Insights</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-6">Survey Response Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div>Participants</div>
                  <div className="text-2xl font-bold">65</div>
                </div>
                <div className="text-gray-500">77%</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div>Sponsors</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
                <div className="text-gray-500">14%</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div>Judges</div>
                  <div className="text-2xl font-bold">7</div>
                </div>
                <div className="text-gray-500">8%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <h3 className="text-xl font-semibold">Top Improvement Themes</h3>
            </div>
            
            <ul className="space-y-3">
              <li>Better event timing</li>
              <li>More mentorship</li>
              <li>Improved networking</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <h3 className="text-xl font-semibold">Key Quotes</h3>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-700">"{'"'}Great opportunity to learn and connect{'"'}"</p>
              <p className="text-gray-700">"{'"'}Would love more technical workshops{'"'}"</p>
              <p className="text-gray-700">"{'"'}Amazing experience overall{'"'}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actionables Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Actionables</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <h3 className="text-xl font-semibold">Ready-to-Send Emails</h3>
            </div>
            
            <ul className="space-y-3">
              <li>Follow-up: Thank you for participating in our Hackathon</li>
              <li>Sponsor appreciation and impact report</li>
              <li>Judge feedback collection reminder</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <h3 className="text-xl font-semibold">Survey Question Suggestions</h3>
            </div>
            
            <ul className="space-y-3">
              <li>What specific mentorship formats would be most valuable?</li>
              <li>How can we improve the project submission process?</li>
              <li>What networking opportunities would you like to see?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Story Highlight Section */}
      <div className="grid grid-cols-2 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/></svg>
            <h3 className="text-xl font-semibold">Story Highlight</h3>
          </div>
          
          <p className="text-gray-700">
            Our third annual hackathon brought together 156 innovators, resulting in 23 groundbreaking projects and fostering unprecedented collaboration between students and industry mentors.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <h3 className="text-xl font-semibold">Agent Recommendations</h3>
          </div>
          
          <ul className="space-y-3">
            <li>Schedule more breaks between sessions</li>
            <li>Add dedicated networking time</li>
            <li>Provide more technical resources</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
