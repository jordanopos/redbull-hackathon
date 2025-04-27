"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ActionsPage() {
  // Email section state
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [showEmailSendDialog, setShowEmailSendDialog] = useState(false);
  const [showEmailEditDialog, setShowEmailEditDialog] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState<"manual" | "ai">("manual");
  const [currentEmailContent, setCurrentEmailContent] = useState("");
  const [emailAIPrompt, setEmailAIPrompt] = useState("");

  // Survey questions section state
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showSurveyUpdateSuccess, setShowSurveyUpdateSuccess] = useState(false);

  // LinkedIn post state
  const [showLinkedInDialog, setShowLinkedInDialog] = useState(false);
  const [showLinkedInEditDialog, setShowLinkedInEditDialog] = useState(false);
  const [linkedInEditMode, setLinkedInEditMode] = useState<"manual" | "ai">(
    "manual"
  );
  const [linkedInPostContent, setLinkedInPostContent] = useState("");
  const [linkedInAIPrompt, setLinkedInAIPrompt] = useState("");

  // Sample data
  const emails = [
    {
      id: "email1",
      subject: "Follow-up: Thank you for participating in our Hackathon",
      content: `Dear Participant,

Thank you for being part of our recent Hackathon event. Your innovative ideas, dedication, and collaborative spirit made this event a tremendous success. 

We hope you found the experience valuable and formed meaningful connections with fellow innovators and industry mentors.

Please take a moment to fill out our feedback survey to help us improve future events.

Best regards,
The Hackathon Team`,
    },
    {
      id: "email2",
      subject: "Sponsor appreciation and impact report",
      content: `Dear Sponsor,

We would like to express our sincere gratitude for your support of our recent Hackathon event. Your contribution was instrumental in making this event a success.

Attached is an impact report highlighting the outcomes of the event, including project highlights and participant feedback.

We look forward to potential future collaborations.

Best regards,
The Hackathon Team`,
    },
    {
      id: "email3",
      subject: "Judge feedback collection reminder",
      content: `Dear Judge,

Thank you for lending your expertise to our recent Hackathon. Your insights were invaluable in evaluating the innovative projects presented.

This is a friendly reminder to submit your detailed feedback on the projects you evaluated. This feedback is extremely valuable for the participants' growth.

The feedback submission form will be open until the end of this week.

Best regards,
The Hackathon Team`,
    },
  ];

  const surveyQuestions = [
    "What specific mentorship formats would be most valuable?",
    "How can we improve the project submission process?",
    "What networking opportunities would you like to see?",
    "Which technologies would you like to see featured in future workshops?",
    "What was your favorite part of the hackathon experience?",
    "How can we better support diverse participation?",
  ];

  const storyHighlight =
    "Our third annual hackathon brought together 156 innovators, resulting in 23 groundbreaking projects and fostering unprecedented collaboration between students and industry mentors.";

  const participants = [
    { id: "p1", name: "All Participants", count: 156 },
    { id: "p2", name: "Attendees", count: 132 },
    { id: "p3", name: "Signups", count: 98 },
    { id: "p4", name: "Participants", count: 65 },
    { id: "p5", name: "Sponsors", count: 12 },
    { id: "p6", name: "Judges", count: 7 },
  ];

  // Default LinkedIn post content
  const defaultLinkedInPost = `Celebrating Innovation: Hackathon Success! 🚀

${storyHighlight}

We&apos;re incredibly proud of all participants who dedicated their time and skills to create meaningful solutions.

Special thanks to our sponsors and mentors who made this possible!

#Hackathon #Innovation #TechForGood #CodingCommunity`;

  // Handler functions
  const handleEmailView = (email: (typeof emails)[0]) => {
    setSelectedEmail(email.id);
  };

  const router = useRouter();

  const handleEditEmail = () => {
    const emailContent =
      emails.find((e) => e.id === selectedEmail)?.content || "";
    setCurrentEmailContent(emailContent);
    setShowEmailEditDialog(true);
  };

  const handleEditModeChange = (mode: "manual" | "ai") => {
    setEmailEditMode(mode);
  };

  const handlePostToLinkedin = () => {
    // Copy content to clipboard
    navigator.clipboard.writeText(linkedInPostContent);

    // Construct LinkedIn share URL with encoded parameters
    const shareUrl =
      "https://www.linkedin.com/shareArticle?" +
      new URLSearchParams({
        mini: "true",
        url: window.location.href,
        title: "Hackathon Success Story",
        summary: linkedInPostContent,
        source: "Hackathon Dashboard",
      }).toString();

    // Open LinkedIn share dialog in new tab
    window.open(shareUrl, "_blank");
  };

  const handleEmailContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentEmailContent(e.target.value);
  };

  const handleEmailAIPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmailAIPrompt(e.target.value);
  };

  const handleGenerateEmailWithAI = () => {
    // In a real app, this would call an AI service
    // For now, we'll just modify the content as a simulation
    setCurrentEmailContent(
      `${currentEmailContent}\n\n[This content was enhanced with AI based on your prompt: "${emailAIPrompt}"]`
    );
    // Reset prompt after "generating"
    setEmailAIPrompt("");
  };

  const handleSaveEmailEdit = () => {
    // In a real app, this would update the email in the database
    setShowEmailEditDialog(false);
  };

  const handleSendEmailConfirm = () => {
    // In a real app, this would send the email
    setShowEmailSendDialog(false);
    // Show success toast or message here
  };

  const handleQuestionToggle = (question: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const handleUpdateSurvey = () => {
    // In a real app, this would update the survey form
    setShowSurveyUpdateSuccess(true);
    setTimeout(() => setShowSurveyUpdateSuccess(false), 3000);
  };

  const handleCreateLinkedInPost = () => {
    setLinkedInPostContent(defaultLinkedInPost);
    setShowLinkedInDialog(true);
  };

  const handleLinkedInEditModeChange = (mode: "manual" | "ai") => {
    setLinkedInEditMode(mode);
  };

  const handleLinkedInContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLinkedInPostContent(e.target.value);
  };

  const handleLinkedInAIPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLinkedInAIPrompt(e.target.value);
  };

  const handleGenerateLinkedInWithAI = () => {
    // In a real app, this would call an AI service
    // For now, we'll just modify the content as a simulation
    setLinkedInPostContent(
      `${linkedInPostContent}\n\n[Enhanced with AI based on: "${linkedInAIPrompt}"]`
    );
    // Reset prompt after "generating"
    setLinkedInAIPrompt("");
  };

  const openEmailEditDialog = () => {
    const emailContent =
      emails.find((e) => e.id === selectedEmail)?.content || "";
    setCurrentEmailContent(emailContent);
  };

  const openLinkedInPostDialog = () => {
    setLinkedInPostContent(defaultLinkedInPost);
  };

  return (
    <main className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Actions</h1>
        <p className="text-gray-600">Manage hackathon actions and tasks</p>
      </div>

      {/* Email Actions Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Email Actions</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 border-r pr-4">
              <h3 className="text-lg font-medium mb-4">Ready-to-Send Emails</h3>
              <ul className="space-y-2">
                {emails.map((email) => (
                  <li key={email.id}>
                    <button
                      className={`w-full text-left p-2 rounded hover:bg-yellow-50 ${
                        selectedEmail === email.id
                          ? "bg-yellow-50 border border-yellow-200"
                          : ""
                      }`}
                      onClick={() => handleEmailView(email)}
                    >
                      {email.subject}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              {selectedEmail ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {emails.find((e) => e.id === selectedEmail)?.subject}
                    </h3>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 whitespace-nowrap"
                            onClick={openEmailEditDialog}
                          >
                            Edit Email
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Email</DialogTitle>
                          </DialogHeader>

                          <div className="mb-4">
                            <div className="flex border-b mb-4">
                              <button
                                className={`py-2 px-4 ${
                                  emailEditMode === "manual"
                                    ? "border-b-2 border-[#ffbd00] text-[#ffbd00]"
                                    : "text-gray-500"
                                }`}
                                onClick={() => handleEditModeChange("manual")}
                              >
                                Manual Edit
                              </button>
                              <button
                                className={`py-2 px-4 ${
                                  emailEditMode === "ai"
                                    ? "border-b-2 border-[#ffbd00] text-[#ffbd00]"
                                    : "text-gray-500"
                                }`}
                                onClick={() => handleEditModeChange("ai")}
                              >
                                AI Assisted
                              </button>
                            </div>

                            {emailEditMode === "manual" ? (
                              <textarea
                                className="w-full p-3 border rounded h-64 font-mono"
                                value={currentEmailContent}
                                onChange={handleEmailContentChange}
                              />
                            ) : (
                              <div>
                                <textarea
                                  className="w-full p-3 border rounded h-32 font-mono mb-4"
                                  value={currentEmailContent}
                                  onChange={handleEmailContentChange}
                                  readOnly={false}
                                />

                                <div className="mb-4">
                                  <label className="block text-sm text-gray-600 mb-2">
                                    Describe how you&apos;d like to improve this
                                    email:
                                  </label>
                                  <textarea
                                    className="w-full p-3 border rounded h-24"
                                    placeholder="e.g., Make it more concise, add more enthusiasm, mention upcoming events..."
                                    value={emailAIPrompt}
                                    onChange={handleEmailAIPromptChange}
                                  />
                                </div>

                                <Button
                                  className="bg-[#ffbd00] hover:bg-yellow-600 mb-4 w-full"
                                  onClick={handleGenerateEmailWithAI}
                                  disabled={!emailAIPrompt.trim()}
                                >
                                  Generate with AI
                                </Button>
                              </div>
                            )}
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="hover:bg-gray-100"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              className="bg-[#ffbd00] hover:bg-yellow-600"
                              onClick={handleSaveEmailEdit}
                            >
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-[#ffbd00] hover:bg-yellow-600 whitespace-nowrap">
                            Send Email
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Select Recipients</DialogTitle>
                          </DialogHeader>

                          <div className="mb-4">
                            <DialogDescription className="pb-2">
                              Who would you like to send this email to?
                            </DialogDescription>
                            <select className="w-full p-2 border rounded">
                              {participants.map((participant) => (
                                <option
                                  key={participant.id}
                                  value={participant.id}
                                >
                                  {participant.name} ({participant.count})
                                </option>
                              ))}
                            </select>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="hover:bg-gray-100"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              className="bg-[#ffbd00] hover:bg-yellow-600"
                              onClick={handleSendEmailConfirm}
                            >
                              Send
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded border whitespace-pre-line">
                    {emails.find((e) => e.id === selectedEmail)?.content}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select an email to view its content
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Survey Question Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Survey Question Manager</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Survey Question Suggestions</h3>
            <Button
              className={`bg-[#ffbd00] hover:bg-yellow-600 ${
                selectedQuestions.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleUpdateSurvey}
              disabled={selectedQuestions.length === 0}
            >
              Update Survey Form
            </Button>
          </div>

          <p className="mb-4 text-sm text-gray-600">
            Select questions to add to your current survey form:
          </p>

          <ul className="space-y-2">
            {surveyQuestions.map((question, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`question-${index}`}
                  className="mr-3 h-4 w-4 text-[#ffbd00]"
                  checked={selectedQuestions.includes(question)}
                  onChange={() => handleQuestionToggle(question)}
                />
                <label htmlFor={`question-${index}`} className="select-none">
                  {question}
                </label>
              </li>
            ))}
          </ul>

          {showSurveyUpdateSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              Survey form updated successfully!
            </div>
          )}
        </div>
      </div>

      {/* Story Highlight Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Story Manager</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Story Highlight</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#0077B5] hover:bg-[#0077B5] whitespace-nowrap"
                  onClick={openLinkedInPostDialog}
                >
                  Create LinkedIn Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>LinkedIn Post Preview</DialogTitle>
                </DialogHeader>

                <div className="mb-4 p-4 border rounded bg-white">
                  <div className="mb-4 whitespace-pre-line">
                    {linkedInPostContent}
                  </div>
                </div>

                <DialogFooter className="flex justify-between">
                  <DialogClose asChild>
                    <Button variant="outline" className="hover:bg-gray-100">
                      Cancel
                    </Button>
                  </DialogClose>
                  <div className="space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 whitespace-nowrap"
                        >
                          Edit Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit LinkedIn Post</DialogTitle>
                        </DialogHeader>

                        <div className="mb-4">
                          <div className="flex border-b mb-4">
                            <button
                              className={`py-2 px-4 ${
                                linkedInEditMode === "manual"
                                  ? "border-b-2 border-[#ffbd00] text-[#ffbd00]"
                                  : "text-gray-500"
                              }`}
                              onClick={() =>
                                handleLinkedInEditModeChange("manual")
                              }
                            >
                              Manual Edit
                            </button>
                            <button
                              className={`py-2 px-4 ${
                                linkedInEditMode === "ai"
                                  ? "border-b-2 border-[#ffbd00] text-[#ffbd00]"
                                  : "text-gray-500"
                              }`}
                              onClick={() => handleLinkedInEditModeChange("ai")}
                            >
                              AI Assisted
                            </button>
                          </div>

                          {linkedInEditMode === "manual" ? (
                            <textarea
                              className="w-full p-3 border rounded h-64 font-mono"
                              value={linkedInPostContent}
                              onChange={handleLinkedInContentChange}
                            />
                          ) : (
                            <div>
                              <textarea
                                className="w-full p-3 border rounded h-32 font-mono mb-4"
                                value={linkedInPostContent}
                                onChange={handleLinkedInContentChange}
                                readOnly={false}
                              />

                              <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-2">
                                  Describe how you&apos;d like to improve this
                                  post:
                                </label>
                                <textarea
                                  className="w-full p-3 border rounded h-24"
                                  placeholder="e.g., Make it more professional, add specific achievements, focus on community impact..."
                                  value={linkedInAIPrompt}
                                  onChange={handleLinkedInAIPromptChange}
                                />
                              </div>

                              <Button
                                className="bg-[#ffbd00] hover:bg-yellow-600 mb-4 w-full"
                                onClick={handleGenerateLinkedInWithAI}
                                disabled={!linkedInAIPrompt.trim()}
                              >
                                Generate with AI
                              </Button>
                            </div>
                          )}
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="hover:bg-gray-100"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button className="bg-[#ffbd00] hover:bg-yellow-600">
                              Save Changes
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      onClick={handlePostToLinkedin}
                      className="bg-[#0077B5] hover:bg-[#0077B5] whitespace-nowrap"
                    >
                      Post to LinkedIn
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-4 bg-gray-50 rounded border">{storyHighlight}</div>
        </div>
      </div>
    </main>
  );
}
