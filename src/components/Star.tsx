
import React from "react";
import { Star as StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarProps {
  filled: boolean;
  onClick?: () => void;
  className?: string;
  size?: number;
  animate?: boolean;
}

const Star = ({ filled, onClick, className, size = 24, animate = false }: StarProps) => {
  return (
    <StarIcon
      size={size}
      fill={filled ? "currentColor" : "none"}
      className={cn(
        "text-star-inactive cursor-default transition-all duration-300",
        filled && "text-star-active",
        onClick && "cursor-pointer hover:scale-110",
        animate && filled && "animate-star-pulse",
        className
      )}
      onClick={onClick}
    />
  );
};

export default Star;
