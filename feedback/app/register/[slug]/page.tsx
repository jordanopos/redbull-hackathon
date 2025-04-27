import { getHackathonBySlug } from "@/actions/getHackathonBySlug";
import RegistrationForm from "./registration-form";
import { notFound } from "next/navigation";
import Image from "next/image";

interface RegistrationPageProps {
  params: {
    slug: string;
  };
}

export default async function RegistrationPage({
  params,
}: RegistrationPageProps) {
  const { slug } = params;
  const { data: hackathon, error } = await getHackathonBySlug(slug);

  if (error || !hackathon) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{hackathon.name}</h1>
        <p className="text-gray-600 mb-4">{hackathon.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
          <div>
            <span className="font-medium">Start:</span>{" "}
            {new Date(hackathon.startDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">End:</span>{" "}
            {new Date(hackathon.endDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Location:</span> {hackathon.location}
          </div>
        </div>
      </div>

      <Image
        width={1000}
        height={2000}
        className="w-full h-full mb-10"
        src={"https://i.ibb.co/277Zhz80/Black-and-Teal-Hackathon-Banner.png"}
        alt="hackathon"
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Register for this Hackathon</h2>
        <RegistrationForm hackathonId={hackathon.id} />
      </div>
    </div>
  );
}
