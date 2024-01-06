import React from "react";

const Inputs = ({ value, onChange }) => {
  return (
    <input
      value={value}
      type="text"
      placeholder="Enter Your Text"
      onChange={onChange}
    />
  );
};

export default Inputs;
