import React from "react";
import gif from "./Assets/catLoader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={gif} alt="" />
    </div>
  );
};

export default Loader;
