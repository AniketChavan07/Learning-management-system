import React, { useEffect, useState } from "react";

const Ratings = ({ rating = 0, onRate }) => {
  const [ratings, setRatings] = useState(rating);

  const handleRating = (value) => {
    setRatings(value);

    if (onRate) {
      onRate(value);
    }
  };

  useEffect(() => {
    setRatings(rating);
  }, [rating]);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const star = index + 1;

        return (
          <span
            key={index}
            onClick={() => handleRating(star)}
            className={`text-2xl cursor-pointer transition-colors ${
              star <= ratings ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default Ratings;