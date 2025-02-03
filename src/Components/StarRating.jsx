import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function StarRating() {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="App ">
      <Rating
        onClick={handleRating}
        SVGclassName="inline"
        allowFraction="true"
        size="30"
      />
    </div>
  );
}
