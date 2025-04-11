
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "./StarRating";
import { Badge } from "@/components/ui/badge";

const ResultCard = ({ rating, explanation }) => {
  // Categories for different ratings
  const getCategory = (stars) => {
    if (stars === 5) return { label: "Perfect Match", color: "bg-green-500" };
    if (stars === 4) return { label: "Strong Match", color: "bg-emerald-500" };
    if (stars === 3) return { label: "Good Match", color: "bg-blue-500" };
    if (stars === 2) return { label: "Fair Match", color: "bg-amber-500" };
    return { label: "Poor Match", color: "bg-red-500" };
  };

  const category = getCategory(rating);

  return (
    <Card className="w-full shadow-lg border-t-4 transition-all duration-500" 
         style={{ borderTopColor: rating >= 4 ? '#10b981' : rating >= 3 ? '#3b82f6' : rating >= 2 ? '#f59e0b' : '#ef4444' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Your Job Match
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6 py-4">
          <StarRating rating={rating} />
          
          <Badge className={`${category.color} text-white px-3 py-1 text-sm`}>
            {category.label}
          </Badge>
          
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium mb-2">Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">{explanation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
