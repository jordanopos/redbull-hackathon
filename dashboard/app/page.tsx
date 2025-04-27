import Image from "next/image";
import { EventSnapshot } from "@/components/event-snapshot";
import { FeedbackAnalysis } from "@/components/feedback-analysis";
import { FeedbackCharts } from "@/components/feedback-charts";

// Hardcoded hackathon ID for initial implementation
// This should match the ID used in other parts of the app
const HACKATHON_ID = "975b7bc4-a3ef-45a5-98ad-e88ccc1a8900";

export default function Home() {
  return (
    <main className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome to your Hackathon management hub
        </p>
      </div>

      {/* Event Snapshot Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          
          <h2 className="text-2xl font-semibold flex gap-2">
          <span className="h-8 w-1 bg-[#ffbd00] rounded-full"></span>
            
            Event Snapshot</h2>
          <div className="text-sm text-gray-500">Last updated: Today</div>
        </div>
        <EventSnapshot hackathonId={HACKATHON_ID} />
      </div>

      {/* Feedback Charts Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold flex gap-2">
            <span className="h-8 w-1 bg-[#ffbd00] rounded-full"></span>
            Feedback Analytics
          </h2>
          <div className="text-sm text-[#ffbd00] hover:underline cursor-pointer">
            View Full Report
          </div>
        </div>
        <FeedbackCharts />
      </div>

      {/* Feedback Analysis Section */}
      <div className="mt-8">
        <FeedbackAnalysis hackathonId={HACKATHON_ID} />
      </div>
    </main>
  );
}
