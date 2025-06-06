import React, { use, useEffect } from "react";

const Rating = ({initialRating, onRate}) => {

  const [rating, setRating] = React.useState(initialRating || 0); // Example rating value

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onRate) {
      onRate(newRating); // Call the onRate callback if provided
    }
  }


  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);


  return (
    <div>
      {
        Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
          return (
            <span key={index} onClick={()=>handleRating(starValue)} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? "text-yellow-500" : "text-gray-400"}`}>
              &#9733; {/* Unicode star character */}
            </span>
          );
        })
      }
    </div>
  );
};

export default Rating;
