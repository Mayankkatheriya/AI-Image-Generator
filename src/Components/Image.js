import React from "react";

const Image = ({ src, alt, onClick }) => {
  return (
    <div className="image">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.open(src)}
      >
        <img src={src} alt={alt} />
      </a>
      <div className="details">
        <p>{alt}</p>
        <div className="btn-container">
          <a href={src} title="Download" download>
            <i className="bx bx-download"></i>
          </a>
          <button title="Remove" onClick={onClick}>
            <i className="bx bxs-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;
