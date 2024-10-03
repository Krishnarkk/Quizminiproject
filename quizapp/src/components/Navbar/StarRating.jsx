import React from "react";

const StarRating = ({ value, setRating }) => {
  const handleClick = (rating) => {
    setRating(rating); // Update the rating when a star is clicked
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi bi-star${value >= star ? "-fill" : ""}`} // Fill the stars based on the value
          style={{ cursor: "pointer", color: "gold", fontSize: "24px" }}
          onClick={() => handleClick(star)}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
