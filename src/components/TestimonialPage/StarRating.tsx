import { Star } from "lucide-react";
import React, { useState } from "react";

interface StarRatingProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function StarRating({ rating, setRating }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleStarEnter = (star: number) => {
    setHoverRating(star);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <ul className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <li
          key={star}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarEnter(star)}
          onMouseLeave={handleStarLeave}
          className="cursor-pointer"
        >
          <Star
            className="size-5"
            fill={`${
              hoverRating >= star || rating >= star ? "#FFD700" : "none"
            }`}
            strokeWidth={1}
            stroke="#FFD700"
          />
        </li>
      ))}
    </ul>
  );
}
