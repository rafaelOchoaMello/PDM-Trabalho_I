import React from "react";
import image from './images/sideImage.jpg';

const cardPoster = () => {
  return (
    <div className="col-sm-3">
      <img
        src={image}
        alt="Card Poster"
        className="img-fluid mx-auto d-block"
      />
    </div>
  );
};

export default cardPoster;
