"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/actions/submitFeedback";
import { CreateFeedbackRequest } from "@/actions/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Form validation schema
const feedbackSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  school: z.string().min(1, "School is required"),
  major: z.string().min(1, "Major is required"),
  year: z.string().min(1, "Year is required"),

  // General Experience
  overallSatisfaction: z.string().optional(),
  futureParticipation: z.string().optional(),

  // Topic & Challenge
  challengeDifficulty: z.string().optional(),
  learningExperience: z.string().optional(),

  // Support & Resources
  mentorSupport: z.string().optional(),
  staffSupport: z.string().optional(),
  resourceAccess: z.string().optional(),
  rubricClarity: z.string().optional(),
  judgingFairness: z.string().optional(),

  // Organization & Clarity
  instructionClarity: z.string().optional(),
  scheduleStructure: z.string().optional(),

  // Open-ended Feedback
  favoritePart: z.string().optional(),
  suggestedImprovements: z.string().optional(),
  additionalComments: z.string().optional(),

  // Legacy fields
  rating: z.coerce.number().int().min(1).max(5).optional(),
  comments: z.string().optional(),
  suggestions: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  hackathonId: string;
}

export default function FeedbackForm({ hackathonId }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      school: "",
      major: "",
      year: "",

      // General Experience
      overallSatisfaction: "",
      futureParticipation: "",

      // Topic & Challenge
      challengeDifficulty: "",
      learningExperience: "",

      // Support & Resources
      mentorSupport: "",
      staffSupport: "",
      resourceAccess: "",
      rubricClarity: "",
      judgingFairness: "",

      // Organization & Clarity
      instructionClarity: "",
      scheduleStructure: "",

      // Open-ended Feedback
      favoritePart: "",
      suggestedImprovements: "",
      additionalComments: "",

      // Legacy fields
      rating: 5,
      comments: "",
      suggestions: "",
    },
  });

  async function onSubmit(values: FeedbackFormValues) {
    setIsSubmitting(true);

    try {
      // First, create temporary participant data
      // In a real app, you'd probably have a create participant endpoint
      // But for this example, we'll skip that step

      // Submit the feedback
      const feedbackData: CreateFeedbackRequest = {
        // General Experience
        overallSatisfaction: values.overallSatisfaction,
        futureParticipation: values.futureParticipation,

        // Topic & Challenge
        challengeDifficulty: values.challengeDifficulty,
        learningExperience: values.learningExperience,

        // Support & Resources
        mentorSupport: values.mentorSupport,
        staffSupport: values.staffSupport,
        resourceAccess: values.resourceAccess,
        rubricClarity: values.rubricClarity,
        judgingFairness: values.judgingFairness,

        // Organization & Clarity
        instructionClarity: values.instructionClarity,
        scheduleStructure: values.scheduleStructure,

        // Open-ended Feedback
        favoritePart: values.favoritePart,
        suggestedImprovements: values.suggestedImprovements,
        additionalComments: values.additionalComments,

        // Legacy fields
        rating: values.rating,
        comments: values.comments,
        suggestions: values.suggestions,

        email: values.email, // In a real app, you'd use a real participant ID
        hackathonId,
      };

      const result = await submitFeedback(feedbackData);

      if (result.error) {
        throw new Error(result.error);
      }

      setIsSuccess(true);
      toast.success("Feedback submitted successfully!");
      form.reset();

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/thank-you");
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600">
          Your feedback has been submitted successfully.
        </p>
        <p className="text-sm text-gray-500 mt-2">Redirecting you...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School</FormLabel>
                <FormControl>
                  <Input placeholder="University of Technology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="3rd" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 1: General Experience */}
        <div className="border p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold mb-4">General Experience</h3>

          <FormField
            control={form.control}
            name="overallSatisfaction"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  How satisfied were you with the overall experience of the
                  hackathon?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Very satisfied",
                      "Satisfied",
                      "Neutral",
                      "Dissatisfied",
                      "Very dissatisfied",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`overall-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`overall-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="futureParticipation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Would you participate in another CSI hackathon in the future?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {["Yes", "No", "Maybe"].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`future-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`future-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 2: Topic & Challenge */}
        <div className="border p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Topic & Challenge</h3>

          <FormField
            control={form.control}
            name="challengeDifficulty"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  How would you rate the difficulty of the challenge?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Too easy",
                      "Easy",
                      "Just right",
                      "Difficult",
                      "Too difficult",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`difficulty-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`difficulty-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="learningExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Did the challenge provide a meaningful learning experience?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Yes, I learned a lot",
                      "Somewhat, I learned a few things",
                      "Neutral",
                      "Not really, I didn't learn much",
                      "No, I didn't learn anything new",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`learning-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`learning-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 3: Support & Resources */}
        <div className="border p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Support & Resources</h3>

          <FormField
            control={form.control}
            name="mentorSupport"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  How would you rate the support provided by mentors during the
                  hackathon?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {["Excellent", "Good", "Neutral", "Poor", "Very poor"].map(
                      (option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            id={`mentor-${option}`}
                            value={option}
                            checked={field.value === option}
                            onChange={() => field.onChange(option)}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`mentor-${option}`}>{option}</label>
                        </div>
                      )
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="staffSupport"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  How would you rate the support provided by CSI staff during
                  the hackathon?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {["Excellent", "Good", "Neutral", "Poor", "Very poor"].map(
                      (option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            id={`staff-${option}`}
                            value={option}
                            checked={field.value === option}
                            onChange={() => field.onChange(option)}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`staff-${option}`}>{option}</label>
                        </div>
                      )
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resourceAccess"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  Did you feel you had access to the necessary tools, resources,
                  and data to complete the challenge?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Yes, everything was provided",
                      "Mostly, but some things were missing",
                      "Neutral",
                      "No, I needed more resources",
                      "No, it was difficult to access what I needed",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`resource-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`resource-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rubricClarity"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  How clear and understandable was the hackathon rubric?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Very clear and understandable",
                      "Somewhat clear and understandable",
                      "Neutral",
                      "Somewhat unclear and confusing",
                      "Very unclear and not understandable",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`rubric-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`rubric-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="judgingFairness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How fair did you find the judging process?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Very fair",
                      "Somewhat fair",
                      "Neutral",
                      "Somewhat unfair",
                      "Very unfair",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`judging-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`judging-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (1-5 stars)</FormLabel>
              <FormControl>
                <div className="flex space-x-4 items-center">
                  <Input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    className="w-full max-w-xs"
                    {...field}
                  />
                  <span className="text-lg font-semibold">{field.value}</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts about the hackathon"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suggestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suggestions for Improvement</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How could we make this hackathon better? (Optional)"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Section 4: Organization & Clarity */}
        <div className="border p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Organization & Clarity</h3>

          <FormField
            control={form.control}
            name="instructionClarity"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  How clear were the hackathon instructions and challenge
                  requirements?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Very clear",
                      "Somewhat clear",
                      "Neutral",
                      "Somewhat unclear",
                      "Very unclear",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`instruction-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`instruction-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scheduleStructure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How well-structured was the hackathon schedule?
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      "Very well-structured",
                      "Somewhat well-structured",
                      "Neutral",
                      "Somewhat disorganized",
                      "Very disorganized",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`schedule-${option}`}
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`schedule-${option}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 5: Open-ended Feedback */}
        <div className="border p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Open-ended Feedback</h3>

          <FormField
            control={form.control}
            name="favoritePart"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  What was your favorite part of the hackathon?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your favorite experience during the hackathon"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="suggestedImprovements"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  What improvements would you suggest for future CSI hackathons?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How could we make future hackathons better?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any other comments?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share any additional thoughts or feedback"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Legacy fields hidden from user view but submitted in the form */}
        <input type="hidden" {...form.register("rating")} value="5" />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </Form>
  );
}
