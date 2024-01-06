import React from "react";

const Inputs = ({value, onChange}) => {
  return (
    <div className="inputs">
      <input
        value={value}
        type="text"
        placeholder="Enter Your Text"
        onChange={onChange}
      />
    </div>
  );
};

export default Inputs;
