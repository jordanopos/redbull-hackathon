import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Hackathon Not Found</h1>
        <p className="text-xl mb-8">
          We couldn't find the hackathon you're looking for.
        </p>
        <p className="text-gray-600 mb-8">
          The URL might be incorrect or the hackathon may no longer be available.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
} 