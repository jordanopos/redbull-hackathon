import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Hackathon Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The hackathon you are looking for does not exist or has been removed.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}