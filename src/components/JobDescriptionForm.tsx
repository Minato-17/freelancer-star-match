
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface FormData {
  jobDescription: string;
  freelancerSkills: string;
  freelancerExperience: string;
}

interface JobDescriptionFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const JobDescriptionForm = ({
  formData,
  setFormData,
  onSubmit,
  loading
}: JobDescriptionFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Job Match Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-lg font-medium">
              Job Description
            </Label>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Paste the full job description here..."
              value={formData.jobDescription}
              onChange={handleChange}
              className="min-h-[120px] resize-y"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="freelancerSkills" className="text-lg font-medium">
              Your Skills
            </Label>
            <Input
              id="freelancerSkills"
              name="freelancerSkills"
              placeholder="e.g., React, JavaScript, TypeScript, Node.js"
              value={formData.freelancerSkills}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="freelancerExperience" className="text-lg font-medium">
              Years of Experience
            </Label>
            <Input
              id="freelancerExperience"
              name="freelancerExperience"
              placeholder="e.g., 3 years"
              value={formData.freelancerExperience}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-white"
            disabled={loading}
          >
            {loading ? "Calculating Match..." : "Calculate Job Match"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionForm;
