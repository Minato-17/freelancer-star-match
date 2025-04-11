
import React, { useState } from "react";
import { toast } from "sonner";
import JobDescriptionForm from "@/components/JobDescriptionForm";
import ResultCard from "@/components/ResultCard";
import { generateRating } from "@/services/ratingService";

const Index = () => {
  const [formData, setFormData] = useState({
    jobDescription: "",
    freelancerSkills: "",
    freelancerExperience: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ rating: number; explanation: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ratingResult = await generateRating({
        jobDescription: formData.jobDescription,
        freelancerSkills: formData.freelancerSkills,
        freelancerExperience: formData.freelancerExperience,
      });

      setResult(ratingResult);
      toast.success("Job match rating calculated successfully!");
    } catch (error) {
      console.error("Error generating rating:", error);
      toast.error("Failed to calculate job match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Freelancer Star Match
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find out how well you match with job opportunities by analyzing your skills 
            and experience against job descriptions.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <JobDescriptionForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            loading={loading}
          />
          
          {result ? (
            <ResultCard rating={result.rating} explanation={result.explanation} />
          ) : (
            <div className="w-full flex items-center justify-center bg-muted/50 rounded-lg p-8">
              <div className="text-center text-muted-foreground">
                <h3 className="text-xl font-medium mb-2">Your results will appear here</h3>
                <p>Submit a job description to see how well you match!</p>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            This tool uses an algorithm to analyze job fit based on your inputs. 
            The rating is for reference only and actual job fit may vary.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
