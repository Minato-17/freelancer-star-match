
// This service simulates what would be a call to a backend API, similar to the Python code provided

// Simulating the generate_rating function from the Python code
export const generateRating = async (data) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    // This is a simplified version of the Python rating logic
    // In a real app, this would be an API call to the Python backend
    const jobDesc = data.jobDescription.toLowerCase();
    const skills = data.freelancerSkills.toLowerCase().split(",").map(s => s.trim());
    const experienceStr = data.freelancerExperience.toLowerCase();
    
    // Extract years from experience text
    const expYears = parseFloat(experienceStr.match(/\d+(\.\d+)?/)?.[0] || "0");
    
    // Keywords that might appear in job requirements
    const keywordSets = [
      ["react", "frontend", "ui", "user interface", "component"],
      ["node", "express", "backend", "api", "server"],
      ["javascript", "typescript", "js", "ts", "programming"],
      ["database", "sql", "nosql", "mongodb", "postgresql"],
      ["cloud", "aws", "azure", "devops", "deployment"]
    ];
    
    // Check how many skill categories match the job description
    const categoryMatches = keywordSets.filter(keywords => 
      keywords.some(word => jobDesc.includes(word)) && 
      skills.some(skill => keywords.some(word => skill.includes(word)))
    ).length;
    
    // Calculate skill score (max 3 points)
    const skillScore = Math.min(3, categoryMatches * 0.75);
    
    // Calculate experience score (max 2 points)
    const expScore = Math.min(2, expYears / 3);
    
    // Calculate total score and convert to 1-5 rating
    const rawScore = skillScore + expScore;
    const rating = Math.max(1, Math.min(5, Math.round(rawScore)));
    
    // Generate explanation based on match analysis
    const skillMatch = categoryMatches > 0 
      ? `Your skills in ${skills.slice(0, 3).join(", ")}${skills.length > 3 ? ", and others" : ""} align ${categoryMatches >= 3 ? "very well" : categoryMatches >= 2 ? "well" : "somewhat"} with the job requirements.`
      : "Your listed skills don't appear to match the core requirements of this position.";
    
    const expMatch = expYears >= 5 
      ? "Your extensive experience exceeds typical requirements for this role." 
      : expYears >= 3 
        ? "Your experience level meets the standard expectations for this position." 
        : expYears >= 1 
          ? "Your experience is on the lower end for this type of position."
          : "Your limited experience may be insufficient for this role.";
    
    const explanation = `${skillMatch} ${expMatch}`;
    
    return {
      rating,
      explanation,
    };
  } catch (error) {
    console.error("Error generating rating:", error);
    
    // Fallback rating in case of error
    return {
      rating: 1,
      explanation: "We couldn't properly analyze your fit for this job. Please check your inputs and try again.",
    };
  }
};
