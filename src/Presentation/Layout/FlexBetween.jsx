import React from "react";

const FlexBetween = ({ children, className = "" }) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {children}
    </div>
  );
};

export default FlexBetween;