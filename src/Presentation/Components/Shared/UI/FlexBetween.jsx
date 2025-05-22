import React from "react";

/* 
  Flexbox layout:
  Dette skaber en container, hvor alle elementer (flex-items) bliver fordelt med lige stor afstand mellem dem.
  Den første og sidste flex-item placeres helt i kanten af containeren, og de andre elementer får jævn afstand imellem.
*/

const FlexBetween = ({ children, className = "" }) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {children}
    </div>
  );
};

export default FlexBetween;