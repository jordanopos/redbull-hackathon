import Image from "next/image";
import { EventSnapshot } from "@/components/event-snapshot";
import { FeedbackAnalysis } from "@/components/feedback-analysis";

// Hardcoded hackathon ID for initial implementation
// This should match the ID used in other parts of the app
const HACKATHON_ID = "975b7bc4-a3ef-45a5-98ad-e88ccc1a8900";

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
        <EventSnapshot hackathonId={HACKATHON_ID} />
      </div>

      {/* Using the FeedbackAnalysis component to replace the hardcoded sections */}
      <FeedbackAnalysis hackathonId={HACKATHON_ID} />
    </main>
  );
}
