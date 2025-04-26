import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-xl mb-8">
          Your feedback has been submitted successfully and is greatly appreciated.
        </p>
        <p className="text-gray-600 mb-8">
          We value your input as it helps us improve future hackathons and provide
          better experiences for all participants.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
} 