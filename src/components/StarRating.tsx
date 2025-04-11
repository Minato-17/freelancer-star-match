
import React from "react";
import Star from "./Star";

interface StarRatingProps {
  rating: number;
  total?: number;
  size?: number;
  className?: string;
  animated?: boolean;
}

const StarRating = ({ 
  rating, 
  total = 5, 
  size = 32, 
  className = "",
  animated = true
}: StarRatingProps) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          size={size}
          animate={animated && index < rating}
        />
      ))}
    </div>
  );
};

export default StarRating;
