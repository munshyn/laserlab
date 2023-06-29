import React from 'react';

const Box = ({ link, imageSrc, title, description }) => {
  return (
    <div className="box-container">
    <a href={link} className="box-link">
      <div className="box">
        <img src={imageSrc} alt={title} className="box-image" />
        <div className="box-description">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </a>
  </div>
  );
};

export default Box;
